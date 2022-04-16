import Container from "../components/layout/container";

export default function Faq() {
  return (
    <Container>
      <div className="faq-area area-padding-2 pt130">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="section-headline text-center">
                <h3 className="text-green">¿Qué saber para invertir?</h3>
                <p>
                Si tienes dudas, aquí te brindamos más información.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-sm-6 col-xs-12">
              <div className="company-faq left-faq">
                <div className="single-faq">
                  <a data-toggle="collapse" href="#faq1">
                    <h4>
                      <span className="number">1.</span>{" "}
                      <span className="q-text">
                        ¿Quiénes pueden invertir en un Fondo de Inversión?
                      </span>
                    </h4>
                  </a>
                  <div id="faq1" className="collapse">
                    <p>
                      Todas las personas naturales (profesionales, empleados,
                      jubilados, comerciantes, estudiantes, amas de casa) o
                      jurídicas (Empresas del sector Público o Privado, Pymes)
                      que, sin importar su actividad, pueden invertir en los
                      Fondos de Inversión abierto.{" "}
                    </p>
                  </div>
                </div>
                <div className="single-faq">
                  <a data-toggle="collapse" href="#faq2">
                    <h4>
                      <span className="number">2.</span>
                      <span className="q-text">
                        ¿Qué es un fondo de inversión?
                      </span>
                    </h4>
                  </a>
                  <div id="faq2" className="collapse">
                    <p>
                      Un Fondo de Inversión se constituye a partir de los
                      Aportes de dinero realizados por personas naturales y
                      jurídicas denominadas Participantes. Dichos Aportes tienen
                      como fin la Compra de Cuotas de Participación, lo que
                      significa que cada Participante al momento de invertir sus
                      recursos en un Fondo de Inversión, recibe un determinado
                      número de Cuotas de Participación.
                    </p>
                    <p>
                      El objetivo principal de un Fondo de Inversión consiste en
                      reunir los aportes de dinero de distintas personas,
                      naturales y jurídicas, para ser invertidos en diferentes
                      instrumentos Financieros.
                    </p>
                  </div>
                </div>
                <div className="single-faq">
                  <a data-toggle="collapse" href="#faq3">
                    <h4>
                      <span className="number">3.</span>
                      <span className="q-text">
                        ¿Quiénes administran los Fondos de Inversión?
                      </span>
                    </h4>
                  </a>
                  <div id="faq3" className="collapse">
                    <p>
                      Los Fondos de Inversión son administrados por sociedades
                      administradoras de fondos de inversión (SAFIs) que tienen
                      como principal objetico invertir los aportes de dinero de
                      los participantes en diversas alternativas de inversión,
                      con el fin de generar mayor rendimiento para los
                      participantes.{" "}
                    </p>
                  </div>
                </div>

                <div className="single-faq">
                  <a data-toggle="collapse" href="#faq4">
                    <h4>
                      <span className="number">4.</span>
                      <span className="q-text">
                        ¿Quién supervisa y fiscaliza a una SAFI?
                      </span>
                    </h4>
                  </a>
                  <div id="faq4" className="collapse">
                    <p>
                      La Autoridad de Supervisión del Sistema Financiero (ASFI)
                      es la encargada de supervisar y fiscalizar a las
                      Sociedades Administradoras de Fondos de Inversión y velar
                      por los consumidores financieros. La supervisión de la
                      ASFI no implica una recomendación o aval respecto a la
                      inversión efectuada en un fondo de inversión.
                    </p>
                  </div>
                </div>
                <div className="single-faq">
                  <a data-toggle="collapse" href="#faq5">
                    <h4>
                      <span className="number">5.</span>
                      <span className="q-text">
                        ¿Qué tipos de Fondos de Inversión existen?
                      </span>
                    </h4>
                  </a>
                  <div id="faq5" className="collapse">
                    <p>
                      En la industria existen 2 tipos de fondos de Inversión de
                      acuerdo a la disponibilidad de los recursos invertidos:
                    </p>
                    <br />
                    <p>
                      <strong className="text-light-green">Abiertos</strong>
                      <br />
                      Los Fondos de Inversión Abiertos o Fondos Mutuos son
                      aquellos cuyo patrimonio es variable y el ingreso y salida
                      de los participantes es libre. Además, las cuotas de
                      participación compradas por los participantes son
                      redimibles directamente por el Fondo (mediante un rescate
                      de cuotas) y su plazo de duración es indefinido. Este tipo
                      de fondos es el más común en los Mercados de Valores.
                    </p>
                    <br />
                    <p>
                      <strong className="text-light-green">Cerrados</strong>
                      <br />
                      Los Fondos de Inversión Cerrados son aquellos cuyo
                      patrimonio inicial y duración están previamente
                      determinados y las cuotas de participación, compradas por
                      los participantes, no son redimibles directamente por el
                      Fondo, pudiendo sus Certificados Nominativos de Cuotas,
                      ser negociados en Bolsa. El ingreso y salida de los
                      participantes podrían en algunos casos, ser restringidos.
                    </p>
                  </div>
                </div>
                <div className="single-faq">
                  <a data-toggle="collapse" href="#faq6">
                    <h4>
                      <span className="number">6.</span>
                      <span className="q-text">
                        ¿Qué son las Cuotas de Participación y los Valores
                        Cuota?
                      </span>
                    </h4>
                  </a>
                  <div id="faq6" className="collapse">
                    <p>
                      Las Cuotas de Participación son los aportes que los
                      inversionistas realizan en un Fondo de Inversión, estas
                      poseen un valor, llamado Valor de Cuota, que cambia en
                      forma diaria y refleja el rendimiento obtenido por el
                      Fondo.
                    </p>
                    <p>
                      Las personas naturales y jurídicas que invierten en los
                      Fondos de Inversión lo hacen a través de la compra de un
                      determinado número de cuotas, que conforman el patrimonio
                      total del Fondo que se divide en partes iguales.
                    </p>
                  </div>
                </div>

                <div className="single-faq">
                  <a data-toggle="collapse" href="#faq7">
                    <h4>
                      <span className="number">7.</span>
                      <span className="q-text">
                        ¿En qué invierten los Fondos de inversión?
                      </span>
                    </h4>
                  </a>
                  <div id="faq7" className="collapse">
                    <p>
                      Los activos en los que invierten los fondos de inversión
                      se encuentran definidos en la Política de Inversiones que
                      se encuentra establecido el Reglamento Interno o Prospecto
                      de cada fondo, autorizado por la Autoridad de Supervisión
                      del Sistema Financiero (ASFI), siendo los principales
                      valores en los que se invierten, los depósitos a plazo
                      fijo de bancos (DPF’s), letras y bonos del Tesoro General
                      de la Nación (TGN) además del Banco Central de Bolivia
                      (BCB).
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-xs-12">
              <div className="company-faq right-faq">
                <div className="single-faq">
                  <a data-toggle="collapse" href="#faq8">
                    <h4>
                      <span className="number">8.</span>
                      <span className="q-text">
                        ¿Cuáles son las ventajas de invertir en un Fondo de
                        Inversión?
                      </span>
                    </h4>
                  </a>
                  <div id="faq8" className="collapse">
                    <p>
                      Los Fondos de Inversión Abiertos se convierten en una
                      alternativa para que los ahorristas participen en el mundo
                      de las inversiones contando con una Administración
                      Profesional que basados en su experiencia y conocimiento
                      busca múltiples alternativas a través la Diversificación
                      de la conformación de los portafolios de inversión y de
                      esta forma, obtengan rendimientos que tienden a ser
                      superiores a los ofrecidos por la banca tradicional y al
                      mismo tiempo contar con liquidez.{" "}
                    </p>
                  </div>
                </div>
                <div className="single-faq">
                  <a data-toggle="collapse" href="#faq9">
                    <h4>
                      <span className="number">9.</span>
                      <span className="q-text">
                        ¿Cuáles son los ingresos que genera un Fondo de
                        Inversión?{" "}
                      </span>
                    </h4>
                  </a>
                  <div id="faq9" className="collapse">
                    <p>
                      Los ingresos que genera un Fondo de Inversión provienen
                      precisamente de las inversiones que realiza en los
                      diferentes instrumentos o activos financieros por ejemplo
                      bonos, acciones, pagares, letras del Tesoro y otros que
                      son negociados en la Bolsa de Valores.{" "}
                    </p>
                  </div>
                </div>
                <div className="single-faq">
                  <a data-toggle="collapse" href="#faq10">
                    <h4>
                      <span className="number">10.</span>
                      <span className="q-text">
                        ¿Cómo se calcula la rentabilidad de un Fondo de
                        Inversión?
                      </span>
                    </h4>
                  </a>
                  <div id="faq10" className="collapse">
                    <p>
                      El rendimiento de un Fondo se calcula a través de la
                      variación porcentual del valor de la cuota entre un
                      período determinado.
                    </p>
                    <p>
                      La ganancia o rendimiento generado por los Fondos de
                      Inversión se refleja diariamente y se lo expresa en el
                      valor de la cuota.
                    </p>
                    <p>
                      La rentabilidad resultante estará expresada en la moneda
                      del Fondo (dólares, bolivianos y UFV´s) y debe expresarse
                      en forma diaria, mensual (30días) o según los períodos
                      normados por ASFI (90, 180,360 días).
                    </p>
                  </div>
                </div>
                <div className="single-faq">
                  <a data-toggle="collapse" href="#faq11">
                    <h4>
                      <span className="number">11.</span>
                      <span className="q-text">
                        ¿Puedo retirar mi dinero en cualquier momento?
                      </span>
                    </h4>
                  </a>
                  <div id="faq11" className="collapse">
                    <p>
                      Si. Una persona puede realizar rescates de sus cuotas en
                      el momento que desee en la mayoría de los Fondos de
                      Inversión sin perder los rendimientos ganados hasta esa
                      fecha. Por eso, se habla que esta inversión es muy
                      líquida.
                    </p>
                  </div>
                </div>
                <div className="single-faq">
                  <a data-toggle="collapse" href="#faq12">
                    <h4>
                      <span className="number">12.</span>
                      <span className="q-text">
                        ¿Qué beneficios tributarios puedo obtener invirtiendo en
                        Fondos de inversión?
                      </span>
                    </h4>
                  </a>
                  <div id="faq12" className="collapse">
                    <p>
                      La ley 3446 del 21/07/06 y sus modificaciones, establece
                      que los aportes que se realice en un Fondo de Inversión en
                      moneda extranjera están exentos del Impuesto a las
                      Transferencias Financieras (ITF).
                      <br />
                      Es decir, que el impuesto se aplicara solamente al momento
                      del rescate de sus cuotas cuyos saldos en las cuentas de
                      participación sean mayores a 2,000 USD. Esta es una
                      ventaja frente a las cajas de ahorros donde el ITF se
                      cobra tanto en depósitos como retiros. Para los Fondos en
                      bolivianos o UFV, no se aplica este impuesto.
                    </p>
                    <p>
                      Por otro lado, sobre el RC-IVA, éste se aplica de forma
                      diaria en función a la ganancia obtenida.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
