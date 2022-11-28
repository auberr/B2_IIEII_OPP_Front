const main_url = "http://15.164.227.242"

window.onload = () => {
    load_edit()
}

const articleId = localStorage.getItem('article_id')
async function load_edit(){

    const response = await fetch (`${main_url}/articles/${articleId}/detail/`,{
        headers : {
            'Authorization' : 'Bearer ' + localStorage.getItem('access'),
            'content-type' : 'application/json',
        },
        method : 'GET',
    })

    response_json = await response.json()
    console.log(response_json)

    const img = document.createElement('img')
    img.src = `${main_url}${response_json.img.output_image}` 
    img.style.display = 'flex';
    img.style.width = '400px';
    img.style.height = '400px'
    img.style.margin = '20px';
    img.style.borderRadius='15%'

    const img_div = document.getElementById('output_img_tag')
    img_div.appendChild(img)

    const pre_title = document.getElementById('title')
    pre_title.value = response_json.title
    const pre_content = document.getElementById('content')
    pre_content.value = response_json.content

}

async function edit_article(){
    const title = document.getElementById('title').value
    const content = document.getElementById('content').value

    const response = await fetch(`${main_url}/articles/${articleId}/detail/`, {
        headers : {
            'Authorization' : 'Bearer ' + localStorage.getItem('access'),
            'content-type' : 'application/json',
        },    
        method : 'PUT',
        body : JSON.stringify({
            "title":title,
            "content":content,

        })

    })
    window.location.replace('article_detail.html')
}


function handleLogout(){
    localStorage.clear()
    window.location.replace("signin.html")
}