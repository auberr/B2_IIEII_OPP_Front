window.onload = async function signincheck(){
    let getLink = window.location.search;
    console.log(getLink)
    let getCode = getLink.split('=');
    console.log(getCode)
    let getOnlyCode = getCode[1];
    console.log(getOnlyCode)
    const redirect_uri = 'http://127.0.0.1:5500/html/main.html'
    Kakao.init('40ff260d348d97f586de1e3a150a7bcb');

    const client_id = '40ff260d348d97f586de1e3a150a7bcb'

    async function request() {
        const response = await fetch("http://127.0.0.1:8000/users/signin/kakao/callback/",{
            headers: {
                'content-type' : 'application/json',
            },
            method : 'POST',
            body : JSON.stringify({
                "code" : getOnlyCode
            })
        })
        const response_json = await response.json()
        console.log(response_json)

        localStorage.setItem('access',response_json.access);
        localStorage.setItem('refresh', response_json.refresh);

        const base64Url = response_json.access.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g,'/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c){
            return '%' + ('00'+ c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        
        localStorage.setItem('payload', jsonPayload);
      }

    request();

} 
