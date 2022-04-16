import Container from "../components/layout/container";
import Slider from "../components/slider";
import OurProducts from "../components/our-products";
import HowTo from "../components/howto";
import Counter from "../components/counter";
import Comparator from "../components/comparator";
import Contacts from "../components/contacts";
import Img from "../components/image";


export async function getServerSideProps(ctx) {
  const { req, res, params } = ctx;
  const PORT = process.env.PORT ?? 3000;
  const baseurl = process.env.BASE_URL + ":" + PORT;
  
  let r = await fetch(baseurl + '/api/posts?where={"post_type":"slider"}');

  let sliders = r.status === 200 ? await r.json() : [];

  return {
    props: {
      sliders,
    },
  };
}

export default function Home({ sliders }) {
  let count = sliders.length;
  
  return (
    <Container>
      {count > 0 && <Slider sliders={sliders} />}

      <div className="feature-area bg-white fix area-padding">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-6 col-xs-12">
              <div className="feature-content">
                <div className="feature-images">
                  <Img s="feature/about.png" a="Ganasafi" />
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-xs-12">
              <div className="feature-text">
                <h3 className="text-green title-about">Ganadero Sociedad Administradora de Fondos de Inversión S.A.
                    GanaSafi S.A.</h3>
               
                <p>
                  Es miembro del grupo <strong>Financiero Ganadero</strong>,
                  nace el año 2020, con la <strong>misión</strong> de
                  Administrar Fondos de Inversión que coadyuven activamente en
                  el desarrollo económico, financiero y social del país,
                  fomentando el ahorro interno nacional, facilitando
                  económicamente la creación, expansión y desarrollo de empresas
                  nacionales, incentivando las inversiones nacionales y/o
                  extranjeras en el país y cubriendo los requerimientos
                  financieros de los diferentes rubros económicos del país,
                  preservando el patrimonio de los clientes inversionistas,
                  participantes de los Fondos de Inversión administrados.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <OurProducts data={{ standalone: false }} />
      <HowTo />
      <Counter />
      <Comparator />
      <Contacts />
    </Container>
  );
}

