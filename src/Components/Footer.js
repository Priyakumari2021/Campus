import React from 'react';
import { Link } from "react-router-dom";

class Footer extends React.Component {
    render() {
        return (
            <footer class="text-white">
            <div id="semi-footer-list" class="footer-menu bgRadiant flex flex-row-semi justify-content-between l-spacing p-t-b-1 lg:p-l-r md:p-l-r">
                <div>
                    <h6 class="f-22 md:f-18 pb-2">Ihr Regionalverband<i class="fa fa-chevron-down" style={{float:"right"}}></i></h6>
                    <ul class="list-none ps-0 f-18">
                        <li><Link to={`/region/IVD-BB`}> Berlin-Brandenburg</Link></li>
                        <li><Link to={`/region/IVD-Mitte`}>IVD Mitte</Link></li>
                        <li><Link to={`/region/IVD-Mitte-Ost`}>IVD Mitte-Ost</Link></li>
                        <li><Link to={`/region/IVD-Nord`}>IVD Nord</Link></li>
                        <li><Link to={`/region/IVD-Süd`}>IVD Süd</Link></li>
                        <li><Link to={`/region/IVD-West`}>IVD West</Link></li>
                    </ul>
                </div>
            </div>
        </footer>
        );
    }
}

export default Footer;