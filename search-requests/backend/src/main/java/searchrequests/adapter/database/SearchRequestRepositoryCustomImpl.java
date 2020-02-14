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
    public List<SearchRequest> findAllMatchingSearchRequests(String firstName, String lastName, String city, Integer price, Integer size) {
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
        if (price != null) {
            Predicate isNull = builder.isNull(root.get("maxPrice"));
            Predicate lessThanOrEqualTo = builder.lessThanOrEqualTo(root.get("maxPrice"), price);
            predicates.add(builder.or(isNull, lessThanOrEqualTo));
        }
        if (size != null) {
            Predicate isNull = builder.isNull(root.get("minSize"));
            Predicate greaterThanOrEqualTo = builder.greaterThanOrEqualTo(root.get("minSize"), price);
            predicates.add(builder.or(isNull, greaterThanOrEqualTo));
        }

        query.where(predicates.toArray(new Predicate[0]));

        return em.createQuery(query.select(root)).getResultList();
    }
}
