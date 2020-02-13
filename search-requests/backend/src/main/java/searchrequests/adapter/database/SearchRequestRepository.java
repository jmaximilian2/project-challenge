package searchrequests.adapter.database;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import searchrequests.model.SearchRequest;

@Repository
public interface SearchRequestRepository extends JpaRepository<SearchRequest, Long>, SearchRequestRepositoryCustom {


}
