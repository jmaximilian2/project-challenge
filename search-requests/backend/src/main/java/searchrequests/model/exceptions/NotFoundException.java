package searchrequests.model.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "The requested resource has not been found")
public class NotFoundException extends RuntimeException {
}
