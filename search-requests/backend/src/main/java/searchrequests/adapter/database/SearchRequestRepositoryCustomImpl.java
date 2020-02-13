package searchrequests.adapter.database;

import org.springframework.stereotype.Repository;
import searchrequests.model.SearchRequest;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

@Repository
public class SearchRequestRepositoryCustomImpl implements SearchRequestRepositoryCustom {
    private EntityManager em;

    public SearchRequestRepositoryCustomImpl(EntityManager em) {
        this.em = em;
    }

    @Override
    public List<SearchRequest> findAllMatchingSearchRequests(String firstName, String lastName, String city, String district, Integer price, Integer size) {
        CriteriaBuilder builder = em.getCriteriaBuilder();
        CriteriaQuery<SearchRequest> query = builder.createQuery(SearchRequest.class);
        Root<SearchRequest> root = query.from(SearchRequest.class);
        ArrayList<Predicate> predicates = new ArrayList<>(6);

        if (firstName != null && !firstName.equals("")) {
            predicates.add(builder.equal(root.get("firstName"), firstName));
        }
        if (lastName != null && !lastName.equals("")) {
            predicates.add(builder.equal(root.get("lastName"), lastName));
        }
        if (city != null && !city.equals("")) {
            predicates.add(builder.equal(root.get("city"), city));
        }
        if (district != null && !district.equals("")) {
            predicates.add(builder.equal(root.get("district"), district));
        }
        if (price != null) {
            predicates.add(builder.lessThanOrEqualTo(root.get("maxPrice"), price));
        }
        if (size != null) {
            predicates.add(builder.greaterThanOrEqualTo(root.get("minSize"), size));
        }

        query.where(predicates.toArray(new Predicate[0]));

        return em.createQuery(query.select(root)).getResultList();
    }
}
