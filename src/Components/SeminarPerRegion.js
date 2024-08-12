import React, { useState, useEffect } from 'react';
import helpers from '../functions';
import { Link } from "react-router-dom";

function SeminarPerRegion() {

    const imageperClick = 8;

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [filtered, setFilterd] = useState([]);
    const [next, setNext] = useState(imageperClick);

    // Get filter option
    const [region, setRegion] = useState(returnRegionId());
    const [category, setCategory] = useState("");
    const [mode, setMode] = useState("");

    const handleSubmit = (evt) => {
        evt.preventDefault();
        filterSeminar();
    }
        // Loading more Card
    const handleMoreImage = () => {
        setNext(next + imageperClick);
    }

        // filter seminars
    function filterSeminar() {
        let startTime = document.getElementById('zeitraum-von').value;
        let endTime = document.getElementById('zeitraum-bis').value;
        let timeStart = reverseDate(startTime);
        let timeEnd = reverseDate(endTime);
        setFilterd(items); // reset list here before new filtering
        setFilterd(items.filter(function (currentElement) {
            let dbDate = currentElement.datum_von.split("T")[0]; // JS Date = day - 1 (!)
            let updatedList = true;
            var jsDbDate = new Date(dbDate);
            jsDbDate.setDate(jsDbDate.getDate() + 1); // JS Date + 1
            // "" means, "all" was selected -> don't filter
            updatedList = (new Date(timeStart) <= new Date(jsDbDate) && new Date(jsDbDate) <= new Date(timeEnd)) || currentElement.anbietername === region || currentElement.kategoriename === category || currentElement.artname === mode
            /* if (timeStart !== "") {
                updatedList = (new Date(timeStart) <= new Date(jsDbDate) && new Date(jsDbDate) <= new Date(timeEnd));
            }
            if (region !== "") {
                updatedList = currentElement.anbietername === region;
            }
            if (category !== "") {
                updatedList = currentElement.kategoriename === category;
            }
            if (mode !== "") {
                updatedList = currentElement.artname === mode;
            }
            console.log(updatedList); */
            return updatedList;
        }))
    }
    

    let day_ger = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];

    // Show Day from the above seminar list
    function displayDay(seminarDate) {
        let seminarDay = new Date(String(seminarDate)).getDay();
        return `${day_ger[seminarDay]}`;
    }

    function returnRegionId() {
        let getUrl = window.location.pathname.split('/');
        let lastPart = getUrl[getUrl.length - 1];
        if(lastPart === "IVD-Sued" ) {
            lastPart = "IVD-Süd";
        }
        return lastPart;
    }

    function reverseDate(date) {
        let reverseDate = date.split(".").reverse();
        let seminarDate = String(reverseDate.join("-"));
        return seminarDate;
    }
    

    

    useEffect(() => {
        fetch("/seminars")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                    //setFilterd(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])
    // Filter per Region id
    const seminarsPerRegion = items.filter((item) => item.anbietername === returnRegionId());
    function updateSum() {
        let sumSpan = document.getElementById("seminarSum"); 
        var entrySum;
        entrySum = (filtered.length !== 0) ? filtered.length :  seminarsPerRegion.length; 
        if(sumSpan && entrySum){ sumSpan.textContent = entrySum; }
        else return false; 
    }
    updateSum();


    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
        <>
            <main className="bg-main lg:p-l-r md:p-l-r">
                <div className="p-t-b-2 c-mediumblue l-spacing-1">
                    <nav aria-label="breadcrumb" className='mb-4 bg-3'>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="https://www.ivd24immobilien.de"  className='c-blue deco-none-1'>ivd24</a></li>
                                <li className="breadcrumb-item active" aria-current="page"><Link to={`/`}  className='c-blue deco-none-1'>Seminarkalender</Link></li>
                                <li className="breadcrumb-item c-mediumblue" aria-current="page">
                            {returnRegionId()}</li>
                            </ol>
                    </nav>
                    <h4 className="f-22">IVD CAMPUS</h4>
                    <h1 className="p-t-b b-600">
                        Veranstaltungen und Bildungsangebote der IVD Bildungsinstitute und Akademien
                    </h1>
                    <p className="f-18 b-600 l-spacing-1 c-black pb-5">Derzeit gibt es 50 Weiterbildungsmöglichkeiten Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad qui neque aspernatur quos sit, illum ratione sapiente tempore et corrupti consequuntur perferendis earum quis veritatis quibusdam hic suscipit atque eveniet.</p>
                    <h2 className="b-600">
                        Alle Veranstaltungen im Überblick
                    </h2>
                    <form>
                        <div className="p-t-b ps-2 pe-2">
                            <div className="row p-t-b g-4">
                                <div className="col-md-6 col-lg-4 md:mt">
                                    <label for="veranstaltung" className="formlabel lg:pb-2 md:pb-2 f-22 md:f-22">Veranstaltung suchen</label>
                                    <input type="text" className="form-control" id="Veranstaltung" placeholder="Suchen nach Ort oder Stitchwort" />
                                </div>
                                <div className="col-md-6 col-lg-4 md:mt">
                                    <label for="region" className="formlabel lg:pb-2 md:pb-2 f-22 md:f-22">Region</label>
                                    <select className="form-select" id="region" value={region} onChange={ e => setRegion(e.target.value) }>
                                        <option value="" selected>Alle Regionen</option>
                                        <option value="IVD-BB">Berlin-Brandenburg</option>
                                        <option value="IVD-Mitte">Mitte</option>
                                        <option value="IVD-Mitte-Ost">Mitte-Ost</option>
                                        <option value="IVD-Nord">Nord</option>
                                        <option value="IVD-Süd">Süd</option>
                                        <option value="IVD-West">West</option>
                                        <option value="DIA">DIA</option>
                                        <option value="EIA">EIA</option>
                                        <option value="IVD">IVD</option>
                                    </select>
                                </div>
                                <div className="col-md-6 col-lg-4 md:mt">
                                    <label for="sparte" className="formlabel lg:pb-2 md:pb-2 f-22 md:f-22">Sparte</label>
                                    <select className="form-select" id="sparte" value={category} onChange={ e => setCategory(e.target.value) }>
                                        <option value="" selected>Alle Sparten</option>
                                        <option value="Makler-Seminare">Makler</option>
                                        <option value="Verwalter-Seminare">Verwalter</option>
                                        <option value="Sachverständigen-Seminare">Sachverständiger</option>
                                        <option value="Bauträger-Seminare">Bauträger</option>
                                    </select>
                                </div>
                                <div className="col-md-6 col-lg-4 md:mt">
                                    <label for="art" className="formlabel lg:pb-2 md:pb-2 f-22 md:f-22">Art</label>
                                    <select className="form-select" id="art" value={mode} onChange={ e => setMode(e.target.value) }>
                                        <option value="" selected>Alle Arten</option>
                                        <option value="Online Seminar/ Webinar">Online Seminar/ Webinar</option>
                                        <option value="Kongress">Kongress</option>
                                        <option value="Fachtagung">Fachtagung</option>
                                    </select>
                                </div>
                                <div className="col-md-3 col-lg-2 md:mt">
                                    <label for="zeitraum-von" className="formlabel lg:pb-2 md:pb-2 f-22 md:f-22">Zeitraum von</label>
                                    <input type="date" className="form-control" id="zeitraum-von" placeholder="TT.MM.JJJJ" />
                                </div>
                                <div className="col-md-3 col-lg-2 md:mt">
                                    <label for="zeitraum-bis" className="formlabel lg:pb-2 md:pb-2 f-22 md:f-22">Zeitraum bis</label>
                                    <input type="date" className="form-control" id="zeitraum-bis" placeholder="TT.MM.JJJJ" />
                                </div>
                                <div className="col-md-6 col-lg-4">
                                    <label for="" className="formlabel"></label>
                                    <button type="submit" className="btn-blue w-100 md:mt-3 lg:mt-3 f-18 l-spacing-1" onClick={handleSubmit}>Suchen</button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <h2 className="b-600 p-t-b-3">
                        Nächste <span id='seminarSum' style={{borderBottom:"4px solid #0792B7"}}></span> Veranstaltungen
                    </h2>
                    <div className="row g-4">
                        { (filtered.length) ? (filtered?.slice(0, next)?.map( (item, index) => (
                            <>
                            
                            <div className="col-12 col-md-6 col-lg-3" key={index}>
                                <Link to={ item.direct_link===1 ? {pathname:`${item.link}`} : {pathname:`/seminar/${item.id}`}} target={ item.direct_link===1 ? "_blank" : "_self" } style={{ textDecoration:"none"}}>
                                    <div className="card h-100 card-shadow">
                                        <div className="card-header card-radient text-w pt-3">
                                            <span>{ helpers.removeSeconds(item.uhrzeit_von) } - { helpers.removeSeconds(item.uhrzeit_bis) } Uhr</span>
                                            <h2>{ displayDay(item.datum_von) }, { helpers.formatDate(item.datum_von) }</h2>
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title pb-2 c-black-1">{ item.veranstaltungsort }</h5>
                                            <h4 className="card-text c-mediumblue">{ item.seminartitel }</h4>
                                        </div>
                                        <div className="card-b-link mb-3">
                                            <span className="f-18-b1 bg-3 p-2 m-4 rounded-3 c-blue">{ item.anbietername }</span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            </>

                        ))) : ((seminarsPerRegion.length) ? (seminarsPerRegion?.slice(0, next)?.map( (item, index) => (

                            <div className="col-12 col-md-6 col-lg-3" key={index}>
                                <Link to={ item.direct_link===1 ? {pathname:`${item.link}`} : {pathname:`/seminar/${item.id}`}} target={ item.direct_link===1 ? "_blank" : "_self" } style={{ textDecoration:"none"}}>
                                    <div className="card h-100 card-shadow">
                                        <div className="card-header card-radient text-w pt-3">
                                            <span>{ helpers.removeSeconds(item.uhrzeit_von) } - { helpers.removeSeconds(item.uhrzeit_bis) } Uhr</span>
                                            <h2>{ displayDay(item.datum_von) }, { helpers.formatDate(item.datum_von) }</h2>
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title pb-2 c-black-1">{ item.veranstaltungsort }</h5>
                                            <h4 className="card-text c-mediumblue">{ item.seminartitel }</h4>
                                        </div>
                                        <div className="card-b-link mb-3">
                                            <span className="f-18-b1 bg-3 p-2 m-4 rounded-3 c-blue">{ item.anbietername }</span>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                        ))) : <div class="alert alert-info">
                                <strong> Keine Verstaltungen von { returnRegionId() }</strong>
                              </div> 
                        )}

                        

                        { filtered.length ? next < filtered?.length && (
                        <div className="text-center mt-4">
                            <button className="f-18-b1 bg-3 p-2 ps-4 pe-4 rounded-3 c-blue" onClick={ handleMoreImage } style={{borderColor:"#0074C2"}}>Mehr laden</button>
                        </div>
                        ) : next < seminarsPerRegion?.length && (
                            <div className="text-center mt-4">
                                <button className="f-18-b1 bg-3 p-2 ps-4 pe-4 rounded-3 c-blue" onClick={ handleMoreImage } style={{borderColor:"#0074C2"}}>Mehr laden</button>
                            </div>
                        )}
                                                
                    </div>
                </div>
            </main>
        </>
        );
    };

}

export default SeminarPerRegion;