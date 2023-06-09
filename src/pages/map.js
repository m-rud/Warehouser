import { useEffect, useState } from "react"
import { collection, getDocs, getDoc, setDoc, doc, addDoc, orderBy, query, deleteDoc, where } from "firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { db } from "../firebase"
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from '@mui/icons-material/Add';

function Map({ user }) {
    const [delivery, setDelivery] = useState([]);
    const [items, setItems] = useState([]);
    const [newDelivery, setNewDelivery] = useState([]);
    const [selectedDelivery, setSelectedDelivery] = useState({});
    const [screen, setScreen] = useState("delivery");

    const getDelivery = async (e) => {
        await getDocs(query(collection(db, "delivery"), orderBy("date", "desc"))).then((querySnapshot) => {
            if (querySnapshot.docs.length != 0) {
                setDelivery(querySnapshot.docs.map((doc) => ({ date: doc.data()["date"], items: doc.data()["items"], status: doc.data()["status"], id: doc.id })));
            } else {
                setDelivery([]);
            }
        });
        if (newDelivery.length == 0) {
            await getDocs(query(collection(db, "items"), orderBy("name"))).then((querySnapshot) => {
                setItems(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            });
        } else {
            await getDocs(query(collection(db, "items"), orderBy("name"), where("name", "not-in", newDelivery.map((item) => (item.name))))).then((querySnapshot) => {
                setItems(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            });
        }
    }

    useEffect(() => {
        getDelivery();
        // eslint-disable-next-line
    }, [])

    function addItemToDelivery(item) {
        let newItem = {
            id: item.id,
            name: item.name,
            amount: 0,
        }
        setNewDelivery([...newDelivery, newItem]);
        setScreen("newDelivery");
        getDelivery();
    }

    function changeNewItemAmount(itemIndex, add) {
        let itemList = newDelivery;
        if (add) {
            itemList[itemIndex].amount += 1;

        } else {
            if (itemList[itemIndex].amount != 0) {
                itemList[itemIndex].amount -= 1;
            }
        }
        setNewDelivery(itemList);
    }

    const addNewDelivery = async (event) => {
        if (newDelivery.length != 0) {
            let testList = [];
            for (let i = 0; i < newDelivery.length; i++) {
                if (newDelivery[i].amount != 0) {
                    testList.push(newDelivery[i]);
                }
            }
            if (testList.length != 0) {
                let newDel = {
                    date: new Date().toLocaleDateString("en-GB") + " " + new Date().toLocaleTimeString(),
                    items: testList,
                    status: "W trakcie"
                }
                await addDoc(collection(db, "delivery"), newDel);
            }

            setNewDelivery([]);
            setScreen("delivery");
            getDelivery();
        }
    }

    const changeDeliveryStatus = async (event) => {
        if (selectedDelivery.status != "Dostarczone") {
            await setDoc(doc(db, "delivery", selectedDelivery.id), {
                date: selectedDelivery.date,
                items: selectedDelivery.items,
                status: "Dostarczone",
            });

            for (let i = 0; i < selectedDelivery.items.length; i++) {
                const docSnap = await getDoc(doc(db, "items", selectedDelivery.items[i].id));
                let item = docSnap.data();
                let newAmount = item.quantity + selectedDelivery.items[i].amount;
                await setDoc(doc(db, "items", selectedDelivery.items[i].id), {
                    name: item.name,
                    quantity: newAmount,
                    shelf: item.shelf,
                    shelf_column: item.shelf_column || 0,
                    shelf_row: item.shelf_row || 0,
                });
            }
            setScreen("delivery");
            getDelivery();
        }
    }

    const deleteDelivery = async (event) => {
        await deleteDoc(doc(db, "delivery", selectedDelivery.id));
        setScreen("delivery");
        getDelivery();
    }

    function addButton() {
        if (user) {
            if (user.role != "pracownik") {
                return (
                    <Box m={2} position="absolute" bottom="0px" right="0px">
                        <Fab
                            color="success"
                            aria-label="add"
                            onClick={() => setScreen("newDelivery")}
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

    function DeliveryScreen(screen) {
        const [counter, setCounter] = useState(0);

        if (screen == "delivery") {
            return (
                <div style={{ width: "100%", height: "100%", display: "flex", flexFlow: "column", justifyContent: "center" }}>
                    <div style={{ width: "95%", height: "95%", overflow: "auto", borderRadius: "25px", margin: "auto", boxShadow: "5px 10px 18px #888888" }}>
                        {
                            delivery?.map((delivery, i) => (
                                <div key={delivery.id} onClick={() => { setSelectedDelivery(delivery); setScreen("deliveryDetails") }} style={{ width: "95%", height: "100px", borderRadius: "25px", boxShadow: "5px 0px 18px #888888", margin: "20px auto" }}>
                                    <div style={{ padding: "20px 20px 0", fontSize: "21px", fontWeight: "bold", textAlign: "left" }}>{delivery.date}</div>
                                    <div style={{ width: "fit-content", marginTop: "6px", marginLeft: "10px", borderRadius: "20px", padding: "5px 20px", fontSize: "16px", textAlign: "center", backgroundColor: delivery.status == "W trakcie" ? "yellow" : "lightgreen" }}>{delivery.status}</div>
                                </div>
                            ))
                        }
                    </div>
                    {addButton()}
                </div>
            )
        } else if (screen == "newDelivery") {
            return (
                <div style={{ width: "100%", height: "95%", display: "flex", flexFlow: "column", justifyContent: "center", marginTop: "15px" }}>
                    <div style={{ width: "95%", height: "95%", overflow: "auto", borderRadius: "25px", margin: "auto", boxShadow: "5px 10px 18px #888888" }}>
                        {
                            newDelivery?.map((newDeliveryItem, i) => (
                                <div key={newDeliveryItem.id} style={{ width: "95%", height: "100px", borderRadius: "25px", boxShadow: "5px 0px 18px #888888", margin: "20px auto" }}>
                                    <div style={{ padding: "20px 20px 0", fontSize: "21px", fontWeight: "bold", textAlign: "left" }}>{newDeliveryItem.name}</div>
                                    <div style={{ padding: "5px 20px", fontSize: "16px", textAlign: "center" }}>
                                        <button onClick={() => { changeNewItemAmount(i, false); setCounter(counter + 1) }} style={{ marginRight: "10px", borderRadius: "25px", backgroundColor: "lightGreen", width: "30px", height: "30px" }}>-</button>
                                        {newDeliveryItem.amount}
                                        <button onClick={() => { changeNewItemAmount(i, true); setCounter(counter + 1) }} style={{ marginLeft: "10px", borderRadius: "25px", backgroundColor: "lightGreen", width: "30px", height: "30px" }}>+</button>
                                    </div>
                                </div>
                            ))
                        }
                        <div onClick={() => { getDelivery(); setScreen("addForNewDelivery") }} style={{ width: "95%", height: "100px", borderRadius: "25px", boxShadow: "5px 0px 18px #888888", margin: "20px auto", backgroundColor: "lightgreen" }}>
                            <p style={{ fontSize: "40px", fontWeight: "bold", paddingTop: "20px", marginTop: "0" }}>+</p>
                        </div>
                    </div>
                    <button onClick={() => { addNewDelivery() }} style={{ margin: "10px auto 0", width: "80%", height: "50px", fontSize: "21px", fontWeight: "bold", backgroundColor: "lightgreen" }}>Gotowe</button>
                    <button onClick={() => { setScreen("delivery"); setNewDelivery([]) }} style={{ margin: "10px auto 0", width: "80%", height: "50px", fontSize: "21px", fontWeight: "bold", backgroundColor: "red" }}>Anuluj</button>
                </div>
            )
        } else if (screen == "addForNewDelivery") {
            return (
                <div style={{ width: "100%", height: "95%", display: "flex", flexFlow: "column", justifyContent: "center", marginTop: "15px" }}>
                    <div style={{ width: "95%", height: "95%", overflow: "auto", borderRadius: "25px", margin: "auto", boxShadow: "5px 10px 18px #888888" }}>
                        {
                            items?.map((item, i) => (
                                <div key={item.id} onClick={() => addItemToDelivery(item)} style={{ width: "95%", height: "100px", borderRadius: "25px", boxShadow: "5px 0px 18px #888888", margin: "20px auto" }}>
                                    <div style={{ padding: "20px 20px 0", fontSize: "21px", fontWeight: "bold", textAlign: "left" }}>{item.name}</div>
                                    <div style={{ padding: "5px 20px", fontSize: "16px", textAlign: "left" }}>Ilość w magazynie: {item.quantity}</div>
                                </div>
                            ))
                        }
                    </div>
                    <button onClick={() => setScreen("newDelivery")} style={{ margin: "10px auto 0", width: "80%", height: "50px", fontSize: "21px", fontWeight: "bold", backgroundColor: "gray" }}>Anuluj</button>
                </div>
            )
        } else if (screen == "deliveryDetails") {
            return (
                <div style={{ width: "100%", height: "95%", display: "flex", flexFlow: "column", justifyContent: "center", marginTop: "15px" }}>
                    <div style={{ width: "95%", height: "95%", overflow: "auto", borderRadius: "25px", margin: "auto", boxShadow: "5px 10px 18px #888888" }}>
                        {
                            selectedDelivery.items?.map((item, i) => (
                                <div key={item.id} style={{ width: "95%", height: "100px", borderRadius: "25px", boxShadow: "5px 0px 18px #888888", margin: "20px auto" }}>
                                    <div style={{ padding: "20px 20px 0", fontSize: "21px", fontWeight: "bold", textAlign: "left" }}>{item.name}</div>
                                    <div style={{ padding: "5px 20px", fontSize: "16px", textAlign: "left" }}>Ilość: {item.amount}</div>
                                </div>
                            ))
                        }
                    </div>
                    <button onClick={() => { changeDeliveryStatus(); setCounter(counter + 1) }} disabled={selectedDelivery.status == "Dostarczone"} style={{ margin: "10px auto 0", width: "80%", height: "50px", fontSize: "21px", fontWeight: "bold", backgroundColor: "lightgreen" }}>Zmień status</button>
                    <button onClick={() => { deleteDelivery(); setCounter(counter + 1) }} style={{ margin: "10px auto 0", width: "80%", height: "50px", fontSize: "21px", fontWeight: "bold", backgroundColor: "red" }}>Usuń</button>
                    <button onClick={() => setScreen("delivery")} style={{ margin: "10px auto 0", width: "80%", height: "50px", fontSize: "21px", fontWeight: "bold", backgroundColor: "gray" }}>Wróc</button>
                </div>
            )
        }
    }

    return (
        <div style={{ width: "100%", height: "100%" }}>
            <div style={{ height: "100%", width: "100%", display: "flex", justifyContent: "center" }}>{DeliveryScreen(screen)}</div>
        </div>
    );
}

export default Map;
