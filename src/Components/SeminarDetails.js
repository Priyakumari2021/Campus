import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import helpers from '../functions';

function SeminarDetails() {

    let { id } = useParams();

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    const [referenten, setReferenten] = useState([]);

    useEffect(() => {
        fetch("/seminars")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )

        fetch("/referenten")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setReferenten(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    const singleSeminar = items.filter((item) => item.id === parseInt(id));
    const getReferents = referenten.filter((referent) => referent.seminarid === parseInt(id));

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="col-lg-12 ps-0 pe-lg-4 pe-0">
                <main>
                    
                    <section className="lg:p-l-r md:p-l-r p-t-b-2">
                        <nav aria-label="breadcrumb" className='mb-4'>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="https://www.ivd24immobilien.de"  className='c-blue deco-none-1'>ivd24</a></li>
                                <li className="breadcrumb-item active" aria-current="page"><Link to={`/`}  className='c-blue deco-none-1'>Seminarkalender</Link></li>
                                <li className="breadcrumb-item c-mediumblue" aria-current="page">
                                {singleSeminar.map(singleSeminar => singleSeminar.seminartitel)}</li>
                            </ol>
                        </nav>
                        <h5 className="c-mediumblue f-22">{singleSeminar.map(singleSeminar => singleSeminar.veranstaltungsort)}</h5>
                        <h1 className="c-mediumblue fw-bolder pb-2 line-h-1 l-spacing">{singleSeminar.map(singleSeminar => singleSeminar.seminartitel)}</h1>
                        <div className="region-verband flex flex-row-semi f-16 b-600">
                            <Link to={`/region/IVD-Mitte`} className="b-600" href="#">IVD-Mitte</Link>
                            <Link to={`/region/IVD-West`} className="b-600" href="#">IVD-West</Link>
                            <Link to={`/region/IVD-BB`} className="b-600" href="#">IVD-Berlin-Brandenburg</Link>
                            <Link to={`/region/IVD-Mitte-Ost`} className="b-600" href="#">IVD-Mitte-Ost</Link>
                            <Link to={`/region/IVD-Nord`} className="b-600" href="#">IVD-Nord</Link>
                            <Link to={`/region/IVD-Sued`} className="b-600" href="#">IVD-Süd</Link>
                        </div>
                    </section>
                    <section className="bg-main lg:p-l-r md:p-l-r p-t-b-2">
                        <div className="row">
                            <div className="col-12 col-md-12 col-lg-8">
                                <h1 className="c-mediumblue line-h-1 l-spacing">Kurs-Beschreibung</h1>
                                <p className="f-18 c-black-1">
                                {<div dangerouslySetInnerHTML={{__html: singleSeminar.map(singleSeminar => singleSeminar.seminarbeschreibung)}}></div>}
                                </p>
                                <img className="mt-5 mb-5" src={singleSeminar.map(singleSeminar => singleSeminar.seminarbild_pfad)} alt="" style={{width:"100%"}}/>
                                <h2 className="c-mediumblue line-h-1 l-spacing b-600">Referent:in</h2>
                                <h3 className="c-mediumblue line-h-1 l-spacing mb-0">{ getReferents.length ? getReferents.map(getReferents => getReferents.vorname) : "Max" }  { getReferents.length ? getReferents.map(getReferents => getReferents.name) : "Musterman" }</h3>

                                <h5 className="c-black-1 line-h-1 l-spacing">{ getReferents.length ? getReferents.map(getReferents => getReferents.position) : " Position" }, { getReferents.length ? getReferents.map(getReferents => getReferents.firma) : "Unternehmen" }</h5>

                                <div className="p-t-b-3">
                                    <h2 className="c-mediumblue fw-bolder p-t-b-3 line-h-1 l-spacing">Zielgruppe</h2>
                                    <div className="region-verband flex flex-row-semi f-18">
                                        <Link className="b-600" href="#">{singleSeminar.map(singleSeminar => singleSeminar.kategoriename)}</Link>
                                        {/* <Link className="b-600" href="#">Makler-Seminare</Link> */}
                                    </div>
                                </div>
                                <div className="p-t-b-3">
                                    <h2 className="c-mediumblue fw-bolder p-t-b-3 line-h-1 l-spacing">Ihr Vorteil</h2>
                                    <p className="f-18 c-black-1">IVD-Mitgliedern werden für die Teilnahme an dieser Veranstaltung <span className="f-18-b">{singleSeminar.map(singleSeminar => singleSeminar.ivd_stunden)} Fortbildungsstunden</span> für das Immobilien Weiterbildungssiegel <span className="f-18-b">gutgeschrieben</span>.</p>
                                </div>
                                <div className="kurs-buchen-btn-1 bg-2 text-center text-w mt-4 p-3 col-12 col-md-6 col-lg-6">
                                    <a href={singleSeminar.map(singleSeminar => singleSeminar.link)} className="text-w p-3 f-16 m-4 l-spacing deco-none b-600">Jetzt buchen</a>
                                </div>
                            </div>
                            <div className="col-md-12 col-lg-1"></div>
                            <div className="shortfacts col-12 col-md-12 col-lg-3 lg:m-height">
                                <div className="card h-100 card-shadow">
                                    <div className="card-header card-radient text-w pt-3 l-spacing">
                                        <span>Die wichtigsten</span>
                                        <h2>Shortfacts</h2>
                                    </div>
                                    <div className="shortfacts-text card-body">
                                        <h5>Kurs</h5>
                                        <h4>{singleSeminar.map(singleSeminar => singleSeminar.seminartitel)}</h4>
                                        <h5>Seminar-ID</h5>
                                        <h4>{singleSeminar.map(singleSeminar => singleSeminar.id)}</h4>
                                        <h5>Zeitraum</h5>
                                        <h4>{helpers.formatDate(singleSeminar.map(singleSeminar => singleSeminar.datum_von))} bis {helpers.formatDate(singleSeminar.map(singleSeminar => singleSeminar.datum_bis))}</h4>
                                        <h5>Uhrzeit</h5>
                                        <h4>{helpers.removeSeconds(singleSeminar.map(singleSeminar => singleSeminar.uhrzeit_von))} - {helpers.removeSeconds(singleSeminar.map(singleSeminar => singleSeminar.uhrzeit_bis))} Uhr</h4>
                                        <h5>Ort</h5>
                                        <h4>{singleSeminar.map(singleSeminar => singleSeminar.veranstaltungsort)}</h4>
                                        <h5>Teilnahmegebühr pro Person</h5>
                                        <h4>IVD Mitglied: {singleSeminar.map(singleSeminar => singleSeminar.preis_ivd)} €</h4> 
                                        <h4>Nicht-Mitglied: {singleSeminar.map(singleSeminar => singleSeminar.preis_extern)} €</h4>
                                        <h5>Zertifikat</h5>
                                        <h4 className="card-title">{singleSeminar.map(singleSeminar => singleSeminar.teilnahmezertifikat_jn === 0 ? "Ja" : "Kein Zertifikat")}</h4>
                                    </div>
                                    <div className="bg-2 card-footer text-center text-w mt-4 p-3">
                                        <a className="text-w p-3 f-16 m-4 l-spacing" href={singleSeminar.map(singleSeminar => singleSeminar.link)}>Jetzt buchen</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </section>
                </main>
            </div>

            //----------------------------------------------------------------------------------------------

        );
    };

}

export default SeminarDetails;