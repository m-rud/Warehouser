import { useEffect, useState } from "react"
import { collection, getDocs, addDoc, orderBy, query } from "firebase/firestore"
import { db } from "../firebase"
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from '@mui/icons-material/Add';


function Items({ user }) {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState([]);
    const [addItemShown, setAddItemShown] = useState(false);

    const getItem = async (e) => {
        await getDocs(query(collection(db, "items"), orderBy("name"))).then((querySnapshot) => {
            setItems(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        });
    }

    useEffect(() => {
        getItem();
        // eslint-disable-next-line
    }, [])

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setNewItem(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        await addDoc(collection(db, "items"), {
            name: newItem.name,
            shelf: newItem.shelf,
            quantity: 0,
        });
        setNewItem({});
        setAddItemShown(false);
        getItem();
    }

    function addButton() {
        if (user) {
            if (user.role !== "pracownik") {
                return (
                    <Box m={2} position="absolute" bottom="0px" right="0px">
                        <Fab
                            color="success"
                            aria-label="add"
                            onClick={() => setAddItemShown(!addItemShown)}
                        >
                            <AddIcon />
                        </Fab>
                    </Box>
                )
            }
        } else {
            return <div></div>
        }
    }

    function addItemComponent(isShown) {
        if (isShown) {
            return (
                <div style={{ width: "100%", height: "100%", display: "flex", flexFlow: "column", justifyContent: "center" }}>
                    <div style={{ width: "70%", margin: "10px auto", borderRadius: "25px", boxShadow: "5px 10px 18px #888888", backgroundColor: "white" }}>
                        <form style={{ display: "flex", flexFlow: "column", padding: "20px" }} onSubmit={handleSubmit}>
                            <label style={{ textAlign: "left", width: "100%", marginBottom: "20px" }}>Nazwa produktu:<br></br>
                                <input style={{ marginTop: "10px", width: "98%" }} type="text" name="name" value={newItem.name || ""} onChange={handleChange} />
                            </label>
                            <label style={{ textAlign: "left", width: "100%", marginBottom: "20px" }}>Numery szafek:<br></br>
                                <input style={{ marginTop: "10px", width: "98%" }} type="text" name="shelf" value={newItem.shelf || ""} onChange={handleChange} />
                            </label>
                            <input style={{ margin: "30px auto 0", width: "80%", height: "50px", fontSize: "21px", fontWeight: "bold", backgroundColor: "lightgreen" }} type="submit" value="Dodaj produkt" />
                            <button onClick={() => setAddItemShown(false)} style={{ margin: "30px auto 0", width: "80%", height: "50px", fontSize: "21px", fontWeight: "bold", backgroundColor: "red" }}>Anuluj</button>
                        </form>
                    </div>
                </div>
            )
        } else {
            return (
                <div style={{ width: "100%", height: "100%", display: "flex", flexFlow: "column", justifyContent: "center" }}>
                    <div style={{ width: "95%", height: "95%", overflow: "auto", borderRadius: "25px", margin: "auto", boxShadow: "5px 10px 18px #888888" }}>
                        {
                            items?.map((item, i) => (
                                <div key={item.id} style={{ width: "95%", height: "120px", borderRadius: "25px", boxShadow: "5px 0px 18px #888888", margin: "20px auto" }}>
                                    <div style={{ padding: "20px 20px 0", fontSize: "21px", fontWeight: "bold", textAlign: "left" }}>{item.name}</div>
                                    <div style={{ padding: "5px 20px", fontSize: "16px", textAlign: "left" }}>Ilość w magazynie: {item.quantity}</div>
                                    <div style={{ padding: "5px 20px", fontSize: "16px", textAlign: "left" }}>Numery regałów: {item.shelf}</div>
                                </div>
                            ))
                        }
                    </div>
                    {addButton()}
                </div>
            )
        }
    }

    return (
        <div style={{ width: "100%", height: "100%" }}>
            <div style={{ height: "100%", width: "100%", display: "flex", justifyContent: "center" }}>{addItemComponent(addItemShown)}</div>
        </div>
    );
}

export default Items;
