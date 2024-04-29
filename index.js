import dotenv from 'dotenv';
import express from 'express';
import pg from 'pg';
import { getAllRoles, addRole, deleteRole } from './functions/db.js';
import bodyParser from 'body-parser';

dotenv.config();
const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req,res) => {
    res.render("index.ejs")
});

app.get('/test',(req, res) => {
    res.render("test.ejs")
});

app.get('/roles', async (req, res) => {
    try {
        const roles = await getAllRoles();
        res.render('roles', { roles });
    } catch (error) {
        console.error('Error fetching roles:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/test2', async (req, res) => {
    try {
        const roles = await getAllRoles();
        res.render('test2', { roles });
    } catch (error) {
        console.error('Error fetching roles:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/addRole', async (req, res) => {
    try {
        const { roleName, roleDescription, roleCommand, roleEmoji } = req.body;
        await addRole(roleName, roleDescription, roleCommand, roleEmoji);
        const roles = await getAllRoles();
        res.render('roles', { roles });
    } catch (error) {
        console.error('Error adding role:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/deleteRole', async (req, res) => {
    try {
        const roleId = req.body.roleId;
        await deleteRole(roleId);
        res.redirect('/roles');
    } catch (error) {
        console.error('Error deleting role:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/manageRole', async (req, res) => {
    const action = req.body.action;
    if (action === 'addRole') {
        try {
          const { roleName, roleDescription, roleCommand, roleEmoji } = req.body;
          await addRole(roleName, roleDescription, roleCommand, roleEmoji);
          const roles = await getAllRoles();
          res.render('roles', { roles });
        } catch (error) {
            console.error('Error adding role:', error);
            res.status(500).send('Error adding role.');
        }
    } else if (action === 'deleteRole') {
        try {
            const roleId = req.body.roleId;
            await deleteRole(roleId);
            const roles = await getAllRoles();
            res.render('roles', { roles });
        } catch (error) {
            console.error('Error deleting role:', error);
            res.status(500).send('Error deleting role.');
        }
    } else {
        res.status(400).send('Invalid action.');
    }
});

app.get('/allRoles', async (req, res) => {
    try {
        const roles = await getAllRoles();
        res.render('roles', { roles });
    } catch (error) {
        console.error('Error fetching roles:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(process.env.PORT);
