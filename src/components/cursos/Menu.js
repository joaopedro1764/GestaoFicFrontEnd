import React, { useEffect } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Person3OutlinedIcon from "@mui/icons-material/Person3Outlined";
import "./menu.css";
import Nav from "react-bootstrap/Nav";
import CardMembershipOutlinedIcon from "@mui/icons-material/CardMembershipOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import SchoolIcon from "@mui/icons-material/School";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import GroupIcon from "@mui/icons-material/Group";

function MenuLateral() {
  return (
    <>
      <div className="painelComponent">
        <img className="imagemLogo" src={require("../Turma/Senai-Logo.png")}></img>

        <div className="navegacao">
          <Nav variant="tabs" defaultActiveKey="/usuarios">
            <Nav.Item className="navItem">
              <Nav.Link className="navLink" href="/home">
                <HomeOutlinedIcon sx={{ marginRight: "30px" }} />
                Home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="navItem">
              <Nav.Link style={{backgroundColor:"#0496ff",color:"#fff"}} className="navLink" href="/usuarios">
                <Person3OutlinedIcon sx={{ marginRight: "30px" }} />
                Usuários
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="navItem">
              <Nav.Link className="navLink" href="/instrutores">
                <BadgeOutlinedIcon sx={{ marginRight: "30px" }} />
                Instrutores
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="navItem">
              <Nav.Link className="navLink" href="/cursos">
                <CardMembershipOutlinedIcon sx={{ marginRight: "30px" }} />
                Cursos
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="navItem">
              <Nav.Link className="navLink" href="/turmas">
                <GroupIcon sx={{ marginRight: "30px" }} /> Turmas
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="navItem">
              <Nav.Link className="navLink" href="/horarios">
                <QueryBuilderIcon sx={{ marginRight: "30px" }} />
                Horário
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
      </div>
    </>
  );
}

export default MenuLateral;
