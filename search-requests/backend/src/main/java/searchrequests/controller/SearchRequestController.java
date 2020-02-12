package searchrequests.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import searchrequests.model.SearchRequest;
import searchrequests.service.SearchRequestService;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/requests")
@CrossOrigin(origins = "http://localhost:4200")
public class SearchRequestController {
    private final Logger log = LoggerFactory.getLogger(this.getClass());
    private final SearchRequestService searchRequestService;

    public SearchRequestController(SearchRequestService searchRequestService) {
        this.searchRequestService = searchRequestService;
    }

    @GetMapping
    public ResponseEntity<List<SearchRequest>> getSearchRequests() {
        log.debug("GET request for all search request");
        return ResponseEntity.ok(searchRequestService.querySearchRequsts());
    }

    @PostMapping
    public ResponseEntity createSearchRequest(@Valid @RequestBody SearchRequest newSearchRequest) throws URISyntaxException {
        log.debug("POST request for new search request: {}", newSearchRequest);
        SearchRequest storedSearchRequest = searchRequestService.createSearchRequest(newSearchRequest);
        URI location = new URI("/requests/" + storedSearchRequest.getId());
        return ResponseEntity.created(location).build();
    }

}
