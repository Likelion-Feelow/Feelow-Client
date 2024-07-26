import Router from "./Router";
import { Main, Footer, Sidebar, Header, Container } from "./styles/AppStyle";
  
function App() {
  return (
    <Container>
      <Header>Header</Header>
      <Sidebar>Sidebar</Sidebar>
      <Main>Main Content</Main>
      <Footer>Footer</Footer>
    </Container>
  );
}

export default App;