import * as React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Link as RouterLink} from 'react-router-dom';
import Search from "../forms/Search";
import logo from "./images/beet.png";
import {MainButton} from "./MainButton";
import {Image} from "antd";
import Button from "@mui/material/Button";

function Header(props) {
    const {sections, title, isInHome, data, isLogged} = props;
    return (<div className=" rmdp-rtl">
        <React.Fragment>
            <Toolbar sx={{borderBottom: 1, borderColor: 'divider'}}>
                {!isInHome && (//if you want to show an error message
                    <Search data={data}/>)}
                <span className="material-icons">
                    <RouterLink to="/">
                        <img src={logo} alt='logo' width="60"/>
                    </RouterLink>
                </span>
                <Typography
                    component="h2"
                    variant="h4"
                    color="#8f032b"
                    align="center"
                    noWrap
                    sx={{flex: 1}}
                >
                    {title}
                </Typography>
                {!isLogged && (<MainButton variant="contained" size="small">
                    ثبت نام/ورود
                </MainButton>)}
                {isLogged && (<MainButton variant="contained" size="small">
                    93571828
                </MainButton>)}
            </Toolbar>
            <Toolbar
                component="nav"
                variant="dense"
                sx={{justifyContent: 'space-between', overflowX: 'auto'}}
            >
                {sections.map((section) => (
                    <Button
                        style={{
                            textDecoration: 'none',
                            color: "#450115",
                            '&:hover': {
                                backgroundColor: '#ff0048',
                                color: '#ff0048',
                                cursor: 'pointer',
                                textColor: '#ff0048',
                                fontWeight: '20'
                            },
                        }}
                    >
                        {section.title}
                    </Button>

                ))}
            </Toolbar>
        </React.Fragment>
    </div>);
}

Header.propTypes = {
    sections: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired, url: PropTypes.string.isRequired,
    }),).isRequired, title: PropTypes.string.isRequired,
};

export default Header;