import Container from "../components/layout/container";
import Img from "../components/image";

export default function QuienesSomos() {
  return (
    <Container>
      <div className="pricing-area area-padding-3">
        <div className="container">
          <div className="row">
            <div className="pricing-content">
              <div className="col-md-8 col-md-offset-2 col-sm-6  col-xs-12">
                <div className="text-left">
                  <h2 className="text-light-green">¿Quiénes somos?</h2>

                  <Img s="quienessomos.jpg" a="Ganasafi" />
                  <br /><br />

                  
                  <p>
                   Ganadero Sociedad Administradora de Fondos de Inversión S.A. GanaSafi S.A.<br/><br/>
Es miembro del grupo Financiero Ganadero, nace el año 2020, con la misión de Administrar Fondos de Inversión que coadyuven activamente en el desarrollo económico, financiero y social del país, fomentando el ahorro interno nacional, facilitando económicamente la creación, expansión y desarrollo de empresas nacionales, incentivando las inversiones nacionales y/o extranjeras en el país y cubriendo los requerimientos financieros de los diferentes rubros económicos del país, preservando el patrimonio de los clientes inversionistas, participantes de los Fondos de Inversión administrados. 
                  </p>
                  <hr />

                  <Img s="organigramaempresarial.png" a="Ganasafi - Organigrama" />
                  

                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
