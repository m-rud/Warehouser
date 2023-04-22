import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"

import { db } from "../firebase"

function Items() {
    const [items, setItems] = useState([]);


    useEffect(() => {
        const getItem = async (e) => {
            await getDocs(collection(db, "items"))
                .then((querySnapshot) => {
                    const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                    setItems(newData);
                    console.log(items, newData);
                })
        }
        getItem();
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            {
                items?.map((item, i) => (
                    <p key={i}>
                        {item.name} -- {item.price}
                    </p>
                ))
            }
        </div>
    );
}

export default Items;
