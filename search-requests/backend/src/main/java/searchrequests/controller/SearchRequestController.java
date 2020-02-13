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
    public ResponseEntity<List<SearchRequest>> getSearchRequests(@RequestParam(value = "firstName",required = false) String firstName,
                                                                 @RequestParam(value = "lastName",required = false) String lastName,
                                                                 @RequestParam(value = "city",required = false) String city,
                                                                 @RequestParam(value = "district",required = false) String district,
                                                                 @RequestParam(value = "price",required = false) Integer price,
                                                                 @RequestParam(value = "size",required = false) Integer size
    ) {
        log.debug("GET request for all search request");
        return ResponseEntity.ok(searchRequestService.querySearchRequests(firstName,lastName,city,district,price,size));
    }

    @PutMapping
    public ResponseEntity saveSearchRequest(@Valid @RequestBody SearchRequest searchRequest) throws URISyntaxException {
        log.debug("PUT request for search request: {}", searchRequest);
        if (searchRequest.getId() == null) {
            SearchRequest storedRequest = searchRequestService.saveSearchRequest(searchRequest);
            URI location = new URI("/requests/" + storedRequest.getId());
            return ResponseEntity.created(location).build();
        } else {
            searchRequestService.saveSearchRequest(searchRequest);
            return ResponseEntity.noContent().build();
        }
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity deleteSearchRequest(@PathVariable Long id) {
        log.debug("DELETE request for search request with id: {}", id);
        searchRequestService.deleteSearchRequest(id);
        return ResponseEntity.noContent().build();
    }
}
