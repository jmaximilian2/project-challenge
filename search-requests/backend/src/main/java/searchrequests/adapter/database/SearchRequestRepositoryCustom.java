package searchrequests.adapter.database;

import searchrequests.model.SearchRequest;

import java.util.List;

public interface SearchRequestRepositoryCustom {

    List<SearchRequest> findAllMatchingSearchRequests(String firstName, String lastName, String city, String district, Integer price, Integer size);

}
