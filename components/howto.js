import Img from "../components/image";

export default function HowTo({ data }) {
    return (
        <>

            <div className="how-to-area area-padding">
                <h3 className="text-light-green text-center">
                    Empieza a invertir en solo tres pasos.
                </h3>
                <br/>
                <div className="container">
                    <div className="row">
                        <div className="all-services">
                            <div className="col-md-4 col-sm-4 col-xs-12">
                                <div className="well-services first-item">
                                    <div className="well-img">
                                        <Img s="paso1.png" a="Ganasafi" w="80px" />
                                    </div>
                                    <div className="main-wel">
                                        <div className="wel-content">
                                            <h4><span>01.</span>Contacta tu asesor comercial</h4>
                                            <p>Te ayudamos a encontrar el fondo que se adapte más a tus necesidades.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-4 col-xs-12">
                                <div className="well-services ">
                                    <div className="well-img">
                                        <Img s="paso2.png" a="Ganasafi" w="80px" />
                                    </div>
                                    <div className="main-wel">
                                        <div className="wel-content">
                                            <h4><span>02.</span>Elige el producto GANASAFI</h4>
                                            <p>Desde nuestras oficinas o la comodidad de tu casa.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-4 col-xs-12">
                                <div className="well-services thired-item">
                                    <div className="well-img">
                                        <Img s="paso3.png" a="Ganasafi" w="80px" />
                                    </div>
                                    <div className="main-wel">
                                        <div className="wel-content">
                                            <h4><span>03.</span>Listo, tu dinero está invertido</h4>
                                            <p>Ahora puedes descansar y dejar que tu dinero trabaje para ti.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}