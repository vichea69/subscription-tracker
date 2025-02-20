const errorHandler = (err, req, res, next) => {
   try {
    let error = {...err};
    error.message = err.message || "Internal Server Error";
    console.log(err);
    //mongoose bad object id
    if (err.name === "CastError") {
        const message = "Resource not found";
        error = new ErrorResponse(message, 404);

    }
    //mongoose duplicate key
    if (err.code === 11000) {
        const message = "Duplicate field value entered";
        error = new ErrorResponse(message, 400);
    }
    //mongoose validation error
    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map((val) => val.message);
        error = new ErrorResponse(message, 400);
    }
    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Internal Server Error"
    });
    
   }
   catch (error) {
    return res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
   }
};

export default errorHandler; 