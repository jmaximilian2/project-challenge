package searchrequests.adapter.database;

import org.springframework.data.repository.CrudRepository;
import searchrequests.model.SearchRequest;

public interface SearchRequestRepository extends CrudRepository<SearchRequest,Long> {
}
