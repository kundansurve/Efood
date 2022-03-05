export let data={
    userType:"User",
    setUserType:function(type){
        alert(this.userType);
        this.userType=type;
        alert(this.userType);
    }
}

export const setUserType=(type)=>{
    alert(data.userType);
    data.userType=type;
    alert(data.userType);
}