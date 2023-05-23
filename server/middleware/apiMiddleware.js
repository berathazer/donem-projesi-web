const apiMiddleware = (req,res,next)=>{
    const api_key = req.query.api_key;

    if (!api_key) {
        return res.json({success:false,error:"api_key is required"});
    }
    if (api_key != process.env.API_KEY){
        return res.json({success:false,error:"api_key is invalid"});
    }
    return next();
}

export default apiMiddleware
