
import styles from './Navbar.module.scss'
import { Flex, Link, Box, Center, Text, Spacer } from '@chakra-ui/react';


export default function Navbar() {
    return (
        <div className={styles.navcontainer}>

            {/* Left side */}
            <div className={styles.nav}>

                <Flex minWidth='max-content' alignItems='center' justifyContent='start'>
                    <Box p='4' className={styles.left}>
                        <Link href='#createproject' style={{ textDecoration: 'none' }}>Create Project</Link>
                    </Box>
                    <Spacer />
                    <Box className={styles.center} justifyContent='center' >
                        <Link href='/' style={{ textDecoration: 'none' }}>MICRORAPTOR</Link>
                    </Box>
                    <Spacer />
                    <Box className={styles.right} justifyContent='end'>
                        <Link href='#register' style={{ textDecoration: 'none' }}>Sign in / Sign up</Link>
                    </Box>
                </Flex>

                {/* Horizontal Line */}
                <div className={styles.hr}>
                    <hr />
                </div>

            </div>

        </div >
    );
}
