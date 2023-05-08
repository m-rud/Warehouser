import { useEffect, useState } from "react"
import { collection, getDocs, getDoc, doc, addDoc, orderBy, query, deleteDoc } from "firebase/firestore"

import { db } from "../firebase"

function Items() {
    const [items, setItems] = useState([]);
    const [currentItem, setCurrentItem] = useState([]);
    const [newItem, setNewItem] = useState([]);
    const [editing, setEditing] = useState(false);

    const getItem = async (e) => {
        await getDocs(query(collection(db, "items"), orderBy("name"))).then((querySnapshot) => {
            setItems(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        });
    }

    useEffect(() => {
        getItem();
        // eslint-disable-next-line
    }, [])

    const updateCurrentItem = async (itemID) => {
        const docRef = doc(db, "items", itemID);
        const docSnap = await getDoc(docRef);

        let itemDict = docSnap.data();
        itemDict.id = itemID;
        setCurrentItem(itemDict);
    };

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setNewItem(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        await addDoc(collection(db, "items"), {
            name: newItem.name,
            shelf: parseInt(newItem.shelf, 10),
            shelf_row: parseInt(newItem.shelf_row, 10),
            quantity: parseInt(newItem.quantity, 10),
        });
        setNewItem({});
        getItem();
    }

    const addItemComponent = (
        <div style={{ width: "100%", height: "100%", display: "flex", flexFlow: "column", justifyContent: "center" }}>
            <div style={{ textAlign: "left", fontSize: "36px", fontWeight: "bold", margin: "0 auto" }}>Dodaj produkt</div>
            <div style={{ width: "70%", height: "50%", margin: "10px auto", borderRadius: "25px", boxShadow: "5px 10px 18px #888888" }}>
                <form style={{ display: "flex", flexFlow: "column", padding: "20px" }} onSubmit={handleSubmit}>
                    <label style={{ textAlign: "left", width: "100%", marginBottom: "20px" }}>Nazwa produktu:<br></br>
                        <input style={{ marginTop: "10px", width: "98%" }} type="text" name="name" value={newItem.name || ""} onChange={handleChange} />
                    </label>
                    <label style={{ textAlign: "left", width: "100%", marginBottom: "20px" }}>Numer szafki:<br></br>
                        <input style={{ marginTop: "10px", width: "98%" }} type="text" name="shelf" value={newItem.shelf || ""} onChange={handleChange} />
                    </label>
                    <label style={{ textAlign: "left", width: "100%", marginBottom: "20px" }}>Numer półki:<br></br>
                        <input style={{ marginTop: "10px", width: "98%" }} type="text" name="shelf_row" value={newItem.shelf_row || ""} onChange={handleChange} />
                    </label>
                    <label style={{ textAlign: "left", width: "100%", marginBottom: "20px" }}>Ilość produktu w magazynie:<br></br>
                        <input style={{ marginTop: "10px", width: "98%" }} type="text" name="quantity" value={newItem.quantity || ""} onChange={handleChange} />
                    </label>
                    <input style={{ margin: "30px auto 0", width: "80%", height: "50px", fontSize: "21px", fontWeight: "bold", backgroundColor: "lightgreen" }} type="submit" value="Dodaj produkt" />
                </form>
            </div>
        </div>
    )

    const itemsList = (
        <div style={{ width: "100%", height: "100%", display: "flex", flexFlow: "column", justifyContent: "center" }}>
            <div style={{ textAlign: "left", fontSize: "36px", fontWeight: "bold" }}>Lista produktów</div>
            <div style={{ width: "95%", height: "90%", overflow: "auto", borderRadius: "25px", marginTop: "1%", boxShadow: "5px 10px 18px #888888" }}>
                {
                    items?.map((item, i) => (
                        <div key={item.id} onClick={() => { updateCurrentItem(item.id) }} style={{ width: "95%", height: "100px", borderRadius: "25px", boxShadow: "5px 0px 18px #888888", margin: "20px auto" }}>
                            <div style={{ padding: "20px 20px 0", fontSize: "21px", fontWeight: "bold", textAlign: "left" }}>{item.name}</div>
                            <div style={{ padding: "5px 20px", fontSize: "16px", textAlign: "left" }}>Ilość w magazynie: {item.quantity}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    );

    const deleteItem = async (itemID) => {
        await deleteDoc(doc(db, "items", itemID));
        setCurrentItem([]);
        getItem();
    }

    const editItem = async (itemID) => {
        if (editing) {

        }
        setEditing(!editing)
    }

    function renderItemDetails() {
        if (currentItem.length != 0) {
            return (
                <div>
                    <p style={{ padding: "0 20px", fontSize: "36px", fontWeight: "bold", textAlign: "left" }}>{currentItem.name}</p>
                    <div style={{ display: "flex", height: "auto" }}>
                        <p style={{ padding: "0 20px", margin: "0px", fontSize: "27px", fontWeight: "bold", textAlign: "left", flex: "1" }}>Numer szafki:</p>
                        <p style={{ padding: "0 20px", margin: "0px", fontSize: "27px", textAlign: "right" }}>{currentItem.shelf}</p>
                    </div>
                    <div style={{ display: "flex" }}>
                        <p style={{ padding: "0 20px", margin: "10px 0 0", fontSize: "27px", fontWeight: "bold", textAlign: "left", flex: "1" }}>Numer półki:</p>
                        <p style={{ padding: "0 20px", margin: "10px 0 0", fontSize: "27px", textAlign: "right" }}>{currentItem.shelf_row}</p>
                    </div>
                    <div style={{ display: "flex" }}>
                        <p style={{ padding: "0 20px", margin: "10px 0 0", fontSize: "27px", fontWeight: "bold", textAlign: "left", flex: "1" }}>Ilość w magazynie:</p>
                        <p style={{ padding: "0 20px", margin: "10px 0 0", fontSize: "27px", textAlign: "right" }}>{currentItem.quantity}</p>
                    </div>
                    <button type="button" onClick={() => { editItem(currentItem.id) }} style={{ marginTop: "50px", width: "80%", height: "50px", fontSize: "21px", fontWeight: "bold", backgroundColor: !editing ? "lightblue" : "lightgreen" }}>
                        {!editing ? "EDYTUJ" : "AKCEPTUJ"}
                    </button>
                    <button type="button" onClick={() => { deleteItem(currentItem.id) }} style={{ marginTop: "50px", width: "80%", height: "50px", fontSize: "21px", fontWeight: "bold", backgroundColor: "red" }}>
                        USUŃ
                    </button>
                </div>
            )
        } else {
            return (
                <p style={{ padding: "0 20px", margin: "50% auto", fontSize: "27px", fontWeight: "bold", flex: "1" }}>Wybierz produkt z listy</p>
            )
        }
    }

    const itemDetails = (
        <div style={{ width: "100%", height: "100%", display: "flex", flexFlow: "column", justifyContent: "center" }}>
            <div style={{ textAlign: "left", fontSize: "36px", fontWeight: "bold" }}>Detale produktu</div>
            <div style={{ width: "95%", height: "90%", overflow: "auto", borderRadius: "25px", marginTop: "1%", boxShadow: "5px 10px 18px #888888" }}>
                {renderItemDetails()}
            </div>
        </div>
    )

    return (
        <div style={{ width: "100%", height: "100%", display: "flex", flexFlow: "row" }}>
            <div style={{ height: "100%", flex: "1", display: "flex", justifyContent: "center" }}>{addItemComponent}</div>
            <div style={{ height: "100%", flex: "1", display: "flex", justifyContent: "center" }}>{itemsList}</div>
            <div style={{ height: "100%", flex: "1", display: "flex", justifyContent: "center" }}>{itemDetails}</div>
        </div>
    );
}

export default Items;
