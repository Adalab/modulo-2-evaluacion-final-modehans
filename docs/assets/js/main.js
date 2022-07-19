"use strict";const newImage="https://via.placeholder.com/200x250/816f9f/000000/?text=",imageNotFound="https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png",isFavSeries=e=>-1!==favourites.findIndex(t=>t.id===e),renderCards=(e,t)=>{let r="";const a=t?"resultCard":"favCard";return e.forEach(e=>{let s="";var i;t&&(i=e.id,-1!==favourites.findIndex(e=>e.id===i))&&(s="favouriteSelect"),r+=` <li class="card js-card-${a} ${s}" id="card-${e.id}">`,r+='<div class="frameImage" >',e.image===imageNotFound?r+=` <img class="card__image" src="${newImage}+${e.title}" alt="Portada de ${e.title}"/>`:r+=` <img class="card__image" src="${e.image}" alt="Portada de ${e.title}"/>`,r+="</div>",r+=` <h3 class="card__title3">${e.title}</h3>`,t||(r+=` <div class="iconDelete js-iconDelete" id="delete-${e.id}"><i class="  fa-solid fa-circle-xmark" ></i></div>`),r+="</li>"}),r},userInput=document.querySelector(".js_userInput"),buttonSearch=document.querySelector(".js_buttonSearch"),resultsSearch=document.querySelector(".js_resultsSearch"),favouriteList=document.querySelector(".js_favouriteList"),buttonDeleteAllFav=document.querySelector(".js_buttonDeleteFavourites");let seriesSearch=[],favourites=[];const saveLocalStorage=()=>{localStorage.setItem("data",JSON.stringify(favourites))},renderCardResult=()=>{resultsSearch.innerHTML=renderCards(seriesSearch,!0),cardResultListener()},renderFavSeries=()=>{favouriteList.innerHTML=renderCards(favourites,!1),iconDeleteListener()},handleClickSearch=e=>{e.preventDefault();const t=userInput.value.toLowerCase();fetch("https://api.jikan.moe/v4/anime?q="+t).then(e=>e.json()).then(e=>{seriesSearch=e.data.map(({mal_id:e,title:t,images:r})=>({id:e,title:t,image:r.jpg.image_url})),0===seriesSearch.length?resultsSearch.innerHTML=`No se ha encontrado ningún resultado para ${t}.`:renderCardResult()}).catch(e=>console.log("Ha sucedido un error: "+e))},handleClickFavourite=e=>{const t=e.currentTarget.id.split("-"),r=parseInt(t[1]),a=seriesSearch.find(e=>e.id===r),s=favourites.findIndex(e=>e.id===r);-1===s?favourites.push(a):favourites.splice(s,1),renderFavSeries(),renderCardResult(),saveLocalStorage()},handleEnterKey=e=>{e&&"Enter"===e.key&&(e.preventDefault(),handleClickSearch(e))},handleDeleteAllFavourites=e=>{e.preventDefault(),favourites=[],renderFavSeries(),saveLocalStorage()},cardResultListener=()=>{document.querySelectorAll(".js-card-resultCard").forEach(e=>{e.addEventListener("click",handleClickFavourite)})},iconDeleteListener=()=>{document.querySelectorAll(".js-iconDelete").forEach(e=>{e.addEventListener("click",handleClickFavourite)})};buttonSearch.addEventListener("click",handleClickSearch),userInput.addEventListener("keypress",handleEnterKey),buttonDeleteAllFav.addEventListener("click",handleDeleteAllFavourites);const onLoad=()=>{favourites=JSON.parse(localStorage.getItem("data")),null===favourites&&(favourites=[],saveLocalStorage()),renderFavSeries()};favourites=JSON.parse(localStorage.getItem("data")),null===favourites&&(favourites=[],saveLocalStorage()),renderFavSeries();