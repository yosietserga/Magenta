import Container from "../../components/layout/container";
import OurProducts from "../../components/our-products";

export default function Productos() {
  return (
    <Container>
      <OurProducts data={{ standalone: true }} />
    </Container>
  );
}
