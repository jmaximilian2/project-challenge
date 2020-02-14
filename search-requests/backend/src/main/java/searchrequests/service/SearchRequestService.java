package searchrequests.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import searchrequests.adapter.database.SearchRequestRepository;
import searchrequests.model.SearchRequest;
import searchrequests.model.exceptions.NotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SearchRequestService {
    private Logger log = LoggerFactory.getLogger(this.getClass());
    private final SearchRequestRepository searchRequestRepository;

    public SearchRequestService(SearchRequestRepository searchRequestRepository) {
        this.searchRequestRepository = searchRequestRepository;
    }

    public SearchRequest saveSearchRequest(SearchRequest newSearchRequest) {
        SearchRequest storedSearchRequest = searchRequestRepository.save(newSearchRequest);
        log.debug("Saved search request: {}", storedSearchRequest);
        return storedSearchRequest;
    }

    public void deleteSearchRequest(Long id) {
        SearchRequest storedSearchRequest = searchRequestRepository.findById(id).orElseThrow(NotFoundException::new);
        searchRequestRepository.deleteById(id);
        log.debug("Deleted search request: {}", storedSearchRequest);
    }

    /**
     * @return list of all {@link SearchRequest} stored in the database matching the provided search criteria
     */
    public List<SearchRequest> querySearchRequests(String firstName,
                                                   String lastName,
                                                   String city,
                                                   String district,
                                                   Integer price,
                                                   Integer size) {
        List<SearchRequest> result = searchRequestRepository.findAllMatchingSearchRequests(firstName, lastName, city, price, size);
        if (district != null && !district.equals("")) {
            result = result.stream()
                    .filter(searchRequest -> searchRequest.getDistricts().isEmpty() || searchRequest.getDistricts().contains(district))
                    .collect(Collectors.toList());
        }
        log.debug("Found {} search requests matching the given criteria.", result.size());
        return result;
    }

}
