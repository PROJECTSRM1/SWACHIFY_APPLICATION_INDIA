import { useState } from "react";
import "./BuysaleProducts.css";
import RentFilterPanel from "./RentFilterPanel";
import RentDetailPage from "./RentDetailPage";

type Property = {
id:string
name:string
location:string
price:string
rating:number
image:string
images:string[]
bedrooms:number
bathrooms:number
area:number
build:number
parking:string
status:string
description:string
agent:{
name:string
role:string
image:string
}
}

const PROPERTIES = [
{
id:"1",
name:"Ayana Homestay",
location:"Yogyakarta",
price:"$310/month",
rating:4.8,
image:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
images:["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80"],
bedrooms:3,
bathrooms:2,
area:1200,
build:2019,
parking:"1 Indoor",
status:"For Rent",
description:"Beautiful property with modern design.",
agent:{
name:"Esther Howard",
role:"Real Estate Agent",
image:"https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200"
}
},

{
id:"2",
name:"Bali Komang Guest",
location:"Bali",
price:"$180/night",
rating:4.5,
image:"https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80",
images:["https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80"],
bedrooms:2,
bathrooms:1,
area:900,
build:2018,
parking:"Outdoor",
status:"For Rent",
description:"Comfortable guest house.",
agent:{
name:"Brooklyn Simmons",
role:"Property Agent",
image:"https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200"
}
},

{
id:"3",
name:"Maharani Villa",
location:"Jakarta",
price:"$320/month",
rating:4.5,
image:"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
images:["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80"],
bedrooms:4,
bathrooms:3,
area:1500,
build:2020,
parking:"2 Indoor",
status:"For Rent",
description:"Luxury villa.",
agent:{
name:"Jenny Wilson",
role:"Property Agent",
image:"https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200"
}
},

{
id:"4",
name:"Apartement Landmark",
location:"Malang",
price:"$320/month",
rating:4.7,
image:"https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
images:["https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80"],
bedrooms:2,
bathrooms:2,
area:1100,
build:2021,
parking:"Indoor",
status:"For Rent",
description:"Modern apartment.",
agent:{
name:"Alex John",
role:"Property Agent",
image:"https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200"
}
}
]

const TOP_LOCATIONS = [
{
id:"1",
name:"Malang",
image:"https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=200&q=80"
},
{
id:"2",
name:"Bali",
image:"https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=200&q=80"
},
{
id:"3",
name:"Yogyakarta",
image:"https://images.unsplash.com/photo-1570130405657-8e3eb4a9a0e2?w=200&q=80"
},
{
id:"4",
name:"Jakarta",
image:"https://images.unsplash.com/photo-1555899434-94d1368aa7af?w=200&q=80"
}
]

export default function BuysaleProducts(){

const [favorites,setFavorites] = useState<string[]>([])
const [showFilter,setShowFilter] = useState(false)
const [selectedProperty,setSelectedProperty] = useState<Property | null>(null)

const [showNearbyAll,setShowNearbyAll] = useState(false)
const [showRecommendedAll,setShowRecommendedAll] = useState(false)
const [showPopularAll,setShowPopularAll] = useState(false)
const [showLocationAll,setShowLocationAll] = useState(false)

const [selectedLocation,setSelectedLocation] = useState<string | null>(null)

const toggleFavorite = (id:string)=>{
if(favorites.includes(id)){
setFavorites(favorites.filter(f=>f!==id))
}else{
setFavorites([...favorites,id])
}
}

const filteredProperties = selectedLocation
? PROPERTIES.filter(p=>p.location === selectedLocation)
: PROPERTIES

return(

<div className="buysale-container">

{/* SEARCH */}

<div className="buysale-search-container">

<input
className="buysale-search-input"
placeholder="Search Property"
/>

<button
className="buysale-filter-btn"
onClick={()=>setShowFilter(true)}
>
Filter
</button>

</div>

{/* BANNER */}

<div className="buysale-banner">

<div className="buysale-banner-left">

<h2 className="buysale-banner-title">
GET YOUR 20% <br/> CASHBACK
</h2>

<p className="buysale-banner-expiry">
*Expired 20 March 2026
</p>

</div>

<img
className="buysale-banner-image"
src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=80"
/>

</div>

{/* RECOMMENDED */}

<div className="buysale-section-header">

<h3 className="buysale-section-title">Recommended</h3>

<span
className="buysale-seeall"
onClick={()=>setShowRecommendedAll(!showRecommendedAll)}
>
{showRecommendedAll ? "See less" : "See all"}
</span>

</div>

<div className="buysale-recommended-row">

{(showRecommendedAll ? filteredProperties : filteredProperties.slice(0,3)).map((item)=>{

const isFav = favorites.includes(item.id)

return(

<div
key={item.id}
className="buysale-rec-card"
onClick={()=>setSelectedProperty(item)}
>

<img src={item.image} className="buysale-rec-image"/>

<div className="buysale-rec-overlay">

<h4 className="buysale-rec-name">{item.name}</h4>
<p className="buysale-rec-location">{item.location}</p>

</div>

<button
className="buysale-heart-btn"
onClick={(e)=>{
e.stopPropagation()
toggleFavorite(item.id)
}}
>
{isFav ? "❤️" : "🤍"}
</button>

<div className="buysale-price-badge">{item.price}</div>

</div>

)

})}

</div>

{/* NEARBY */}

<div className="buysale-section-header">

<h3 className="buysale-section-title">Nearby</h3>

<span
className="buysale-seeall"
onClick={()=>setShowNearbyAll(!showNearbyAll)}
>
{showNearbyAll ? "See less" : "See all"}
</span>

</div>

<div className="buysale-list">

{(showNearbyAll ? filteredProperties : filteredProperties.slice(0,3)).map((item)=>{

const isFav = favorites.includes(item.id)

return(

<div
key={item.id}
className="buysale-list-card"
onClick={()=>setSelectedProperty(item)}
>

<img src={item.image} className="buysale-list-image"/>

<div className="buysale-list-info">

<div className="buysale-list-top">

<h4>{item.name}</h4>

<button
onClick={(e)=>{
e.stopPropagation()
toggleFavorite(item.id)
}}
>
{isFav ? "❤️" : "🤍"}
</button>

</div>

<p className="buysale-list-location">{item.location}</p>

<div className="buysale-list-footer">

<span className="buysale-list-price">{item.price}</span>
<span className="buysale-rating">⭐ {item.rating}</span>

</div>

</div>

</div>

)

})}

</div>

{/* TOP LOCATIONS */}

<div className="buysale-section-header">

<h3 className="buysale-section-title">
Top Locations
</h3>

<span
className="buysale-seeall"
onClick={()=>setShowLocationAll(!showLocationAll)}
>
{showLocationAll ? "See less" : "See all"}
</span>

</div>

<div className="buysale-location-row">

{(showLocationAll ? TOP_LOCATIONS : TOP_LOCATIONS.slice(0,3)).map((loc)=>(

<div
key={loc.id}
className="buysale-location-chip"
onClick={()=>setSelectedLocation(loc.name)}
>

<img src={loc.image} className="buysale-location-img"/>

<span className="buysale-location-name">
{loc.name}
</span>

</div>

))}

</div>

{/* POPULAR */}

<div className="buysale-section-header">

<h3 className="buysale-section-title">
Popular for you
</h3>

<span
className="buysale-seeall"
onClick={()=>setShowPopularAll(!showPopularAll)}
>
{showPopularAll ? "See less" : "See all"}
</span>

</div>

<div className="buysale-list">

{(showPopularAll ? filteredProperties : filteredProperties.slice(0,3)).map((item)=>{

const isFav = favorites.includes(item.id)

return(

<div
key={item.id}
className="buysale-list-card"
onClick={()=>setSelectedProperty(item)}
>

<img src={item.image} className="buysale-list-image"/>

<div className="buysale-list-info">

<div className="buysale-list-top">

<h4>{item.name}</h4>

<button
onClick={(e)=>{
e.stopPropagation()
toggleFavorite(item.id)
}}
>
{isFav ? "❤️" : "🤍"}
</button>

</div>

<p className="buysale-list-location">{item.location}</p>

<div className="buysale-list-footer">

<span className="buysale-list-price">{item.price}</span>
<span className="buysale-rating">⭐ {item.rating}</span>

</div>

</div>

</div>

)

})}

</div>

{/* FILTER PANEL */}

{showFilter && (

<RentFilterPanel
onClose={()=>setShowFilter(false)}
onApply={(filters)=>console.log(filters)}
/>

)}

{selectedProperty && (

<div className="detail-modal-overlay">

<RentDetailPage
property={selectedProperty}
onClose={()=>setSelectedProperty(null)}
/>

</div>

)}

</div>

)

}