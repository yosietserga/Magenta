import Script from "next/script";
import Link from "next/link";
import Img from "../image";

export default function Footer({ data }) {
  return (
    <footer className="footer-1">
      <div className="footer-area">
        <div className="container">
          <div className="row">
            {" "}
            <div className="col-md-5 col-sm-6 col-xs-12">
              <div className="footer-content logo-footer">
                <div className="footer-head">
                  <div className="footer-logo">
                    <Link href="/">
                      <a className="footer-black-logo">

                          <Img s="logo/logofooter.png" w="400px" a="" />
                        
                      </a>
                   </Link>
                  </div>
                  <p>
                    La oficina principal de GanaSafi S.A. se encuentra ubicada
                    en la Calle Murillo Nº 89, Planta Alta, de la ciudad de
                    Santa Cruz, teléfono 591- (3) 317-0400.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-3 col-xs-12">
              <div className="footer-content">
                <div className="footer-head">
                  <h4 className="text-light-green">Productos</h4>
                  <ul className="footer-list">
                    <li>
                      <Link href="/productos/gana-inversiones">
                        <a>GanaInversiones</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/productos/gana-rendimiento">
                        <a>GanaRendimiento</a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-3 col-xs-12">
              <div className="footer-content">
                <div className="footer-head">
                  <h4 className="text-light-green">Contacto</h4>
                  <ul className="footer-list">
                    <li>
                      <a href="tel:59133170400">Tel: 591 3 3170400</a>
                    </li>
                    <li>
                      <a href="mailto:informaciones@ganasafi.bom.bo">informaciones@ganasafi.bom.bo</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-area-bottom">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-6 col-xs-12">
              <div className="copyright">
                <p>
                  Copyright © 2021 <a href="#">GANASAFI</a> Todos los derechos reservados.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Script
        src="/assets/static/js/vendor/jquery-1.12.4.min.js"
        strategy="beforeInteractive"
      />
      <Script
        src="/assets/static/js/bootstrap.min.js"
        strategy="beforeInteractive"
      />

      <Script
        src="/assets/static/js/owl.carousel.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="/assets/static/js/jquery.stellar.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="/assets/static/js/jquery.counterup.min.js"
        strategy="afterInteractive"
      />
      <Script src="/assets/static/js/waypoints.js" strategy="afterInteractive" />
      <Script
        src="/assets/static/js/jquery.nice-select.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="/assets/static/js/magnific.min.js"
        strategy="afterInteractive"
      />
      <Script src="/assets/static/js/wow.min.js" strategy="afterInteractive" />
      <Script
        src="/assets/static/js/jquery.meanmenu.js"
        strategy="afterInteractive"
      />
      <Script
        src="/assets/static/js/form-validator.min.js"
        strategy="afterInteractive"
      />

      <Script src="/assets/static/js/plugins.js" strategy="lazyOnload" />
      <Script src="/assets/static/js/main.js" strategy="lazyOnload" />
    </footer>
  );
}
