const auth=(token)=>{
    if(token){
        return true
    }
    else
    {
        return false
    }
}
module.exports=auth