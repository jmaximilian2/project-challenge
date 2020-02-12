package searchrequests.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import searchrequests.adapter.database.SearchRequestRepository;
import searchrequests.model.SearchRequest;

import java.util.ArrayList;
import java.util.List;

@Service
public class SearchRequestService {
    private Logger log = LoggerFactory.getLogger(this.getClass());
    private final SearchRequestRepository searchRequestRepository;

    public SearchRequestService(SearchRequestRepository searchRequestRepository) {
        this.searchRequestRepository = searchRequestRepository;
    }

    public SearchRequest createSearchRequest(SearchRequest newSearchRequest) {
        SearchRequest storedSearchRequest = searchRequestRepository.save(newSearchRequest);
        return storedSearchRequest;
    }

    /**
     * @return list of all {@link SearchRequest} stored in the database matching the provided search criteria
     */
    public List<SearchRequest> querySearchRequsts() {
        List<SearchRequest> result = new ArrayList<>();
        searchRequestRepository.findAll().forEach(result::add);
        log.debug("Found {} search requests matching the given criteria.", result.size());
        return result;
    }

}
