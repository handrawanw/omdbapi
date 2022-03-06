const base_url = "https://www.omdbapi.com";

function encodeQueryString(params) {
    const keys = Object.keys(params)
    return keys.length
        ? "?" + keys
            .map(key => encodeURIComponent(key)
                + "=" + encodeURIComponent(params[key]))
            .join("&")
        : ""
}

async function setDetail(imdbID) {
    let payload=await getMovie({omdbID:imdbID});
    console.log("detail ",payload);
    let setDetail=document.querySelector("#container-id");
    setDetail.innerHTML=`
    <div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
        <div class="col-md-4">
            <img src="${payload.Poster}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body">
            <h5 class="card-title">${payload.Title}</h5>
            <p class="card-text">${payload.Genre}</p>
            <p class="card-text">${payload.Plot}</p>
            <p class="card-text"><small class="text-muted">${payload.Year}</small></p>
            </div>
        </div>
        <button type="button" class="btn btn-primary" onClick="setList('batman')">Back</button>
        </div>
    </div>
    `;
}

function getMovie({method="GET",search="",omdbID=""}) {
    /*
        s = search berdasarkan title,
        omdbID = search berdasarkan id
        t = detail informasi data
    */
    let params={
        apiKey:"6977338",
        s:search,
        i:omdbID,
        // t:detail
    };
    let paramsEncode=encodeQueryString(params);
    // console.log(base_url+paramsEncode);
    return fetch(base_url+paramsEncode,{
        method:"GET",
        mode:"cors"
    }).then(async(res)=>{
        let payload=await res.json();
        return payload;
    }).catch((err)=>{
        console.log(err.message);
    });
}

async function setList(keyword) {
    let payload=await getMovie({search:keyword});
    // console.log("hai",payload);
    let setHtml=document.querySelector("#container-id");
    let textHtml="";
    if(payload&&payload.Response==="True"){
        for(let item of payload.Search){
            // Poster: "https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
            // Title: "Batman Begins"
            // Type: "movie"
            // Year: "2005"
            // imdbID: "tt0372784"
            textHtml+=`
            <div class="card" style="width: 18rem;">
                <img src="${item.Poster.includes("N/A")?"https://posmaster.tokokitangalam.com/img/default-image.jpg":item.Poster}" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">${item.Title}</h5>
                <p class="card-text">
                juduls
                </p>
                <button type="button" class="btn btn-primary" onClick="setDetail('${item.imdbID}')">Detail</button>
                </div>
            </div>
            `;
        }
        setHtml.innerHTML=textHtml;
    }else{
        textHtml=`<h1>Ga ada</h1>`;
    }
}

let buttonSave=document.querySelector("#s-keyword");
let sValue=document.querySelector("#s-value");

setList("batman");

buttonSave.addEventListener("click", function () {
    setList(sValue.value);
});