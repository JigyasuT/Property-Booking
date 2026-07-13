exports.isGuest=(req,res,next)=>{
    if(req.user.role!=="guest"){
         return res.status(403).json({
            success:false,
            message:"Only Guest can accress"
         })
    }
    next();
}