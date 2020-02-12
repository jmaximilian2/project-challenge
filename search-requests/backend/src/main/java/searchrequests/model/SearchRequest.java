package searchrequests.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
public class SearchRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    private String firstName;

    @NotNull
    private String lastName;

    @NotNull
    private String city;

    @ElementCollection
    private List<String> districts;

    private Integer maxPrice;

    private Integer minSize;

    @NotNull
    private String mailAddress;

    private String phoneNumber;

    private String comment;

    public SearchRequest(@NotNull String firstName, @NotNull String lastName, @NotNull String city, List<String> districts, Integer maxPrice, Integer minSize, @NotNull String mailAddress, String phoneNumber, String comment) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.city = city;
        this.districts = districts;
        this.maxPrice = maxPrice;
        this.minSize = minSize;
        this.mailAddress = mailAddress;
        this.phoneNumber = phoneNumber;
        this.comment = comment;
    }

    public SearchRequest() {
    }

    public Long getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getCity() {
        return city;
    }

    public List<String> getDistricts() {
        return districts;
    }

    public Integer getMaxPrice() {
        return maxPrice;
    }

    public Integer getMinSize() {
        return minSize;
    }

    public String getMailAddress() {
        return mailAddress;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getComment() {
        return comment;
    }


    @Override
    public String toString() {
        return "SearchRequest{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", city='" + city + '\'' +
                ", districts=" + districts +
                ", maxPrice=" + maxPrice +
                ", minSize=" + minSize +
                ", mailAddress='" + mailAddress + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", comment='" + comment + '\'' +
                '}';
    }
}
