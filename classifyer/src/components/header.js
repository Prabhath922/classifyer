import React , {useEffect,useState} from 'react';

function Header(){
    const[location,setLocation]=useState(null)
    const[error,setError]=useState(null);

    useEffect(()=>{
        if("geolocation" in navigator){
            navigator.geolocation.getCurrentPosition(
               async (position)=>{
                const {latitude,longitude}=position.coords;
                try {
                  const res = await fetch(
                    `https://corsproxy.io/?https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
                  );                  
                  const data = await res.json();
                  const cityName = data.address.city || data.address.town || data.address.village || data.address.state;
                  setLocation(cityName);
                } catch (err) {
                  setError("Failed to get city.");
                }
                },(err)=>{
                    setError(err.message)
                },
                {
                    enableHighAccuracy:true,
                }
            )
        }else{
            setError("there was an issue with the location permissions of the users");
        }
    })
    return (
      <header className="app-header">
        <h1>My React Header</h1>
        {location ? (
          <p>Your current city: <strong>{location}</strong></p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <p>Detecting your city...</p>
        )}
      </header>
    );
}
export default Header;