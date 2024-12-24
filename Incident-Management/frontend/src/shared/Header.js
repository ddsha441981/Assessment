import { Navbar, NavbarBrand} from 'reactstrap';


const Header = () =>{
    return(
        <>
        <Navbar
          className="my-2"
          color="dark"
          dark
        >
          <NavbarBrand href="/">
            <img
              alt="logo"
              src="/logo192.png"
              style={{
                height: 40,
                width: 40
              }}
            />
            Incident Management
          </NavbarBrand>
        </Navbar>
      </>
    );
}
export default Header;