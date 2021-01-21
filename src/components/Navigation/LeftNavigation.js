import React, {useState} from 'react'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import { Button } from 'react-bootstrap';
import styles from './Navigation.module.css';
import {Link} from 'react-router-dom';

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }

    return (
        <>
            <Button className={styles.MenuButton} onClick={toggleDrawer}></Button>
            <Drawer open={isOpen} onClose={toggleDrawer} direction='left'>
                <div className={styles.LinkWrapper}>
                    <Link to="/task" className={styles.MenuLink}>Add Task</Link>
                    <Link to="/view" className={styles.MenuLink}>View Tasks</Link>
                </div>
            </Drawer>
        </>
    )
}

export default Navigation;