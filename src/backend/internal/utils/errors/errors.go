package errors

type AppError struct {
    Code    int
    Message string
    Err   error
}

func NewAppError(code int, message string, err error) *AppError {
    return &AppError{
        Code:    code,
        Message: message,
        Err:   err,
    }
}

// Error implements the error interface
func (e *AppError) Error() string {
    if e.Err != nil {
        return e.Message + ": " + e.Err.Error()
    }
    return e.Message
}

// Common error codes
const (
    ErrBadRequest   = 400
    ErrUnauthorized = 401
    ErrForbidden    = 403
    ErrNotFound     = 404
    ErrInternal     = 500
)