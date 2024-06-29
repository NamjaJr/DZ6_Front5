import {asyncGetUsers} from "./store/slice/usersSlice";
import {useAppDispatch, useAppSelector,} from "./hooks/redux";
import {useEffect, useState} from "react";
import './App.css'
import {User} from "./store/slice/userTypes";

const App = () => {
    const [showMoreInfo, setShowMoreInfo] = useState([])
  const {users, loading, error} = useAppSelector(state => state.user)

    const dispatch = useAppDispatch()

    const handleShowMoreInfo = (index: number) => {
        let newArr = [...showMoreInfo]
        newArr[index] = !newArr[index]
        setShowMoreInfo(newArr)
    }

    useEffect(() => {
        dispatch(asyncGetUsers())
    }, [dispatch])

    if (loading) return (
        <div>
            LOADING...
        </div>
    )

    if (error) return (
        <div>
            {error}
        </div>
    )

  return (
      <>
        {
          (Array.isArray(users) && users.length > 0) ? (
              <ul className={'userList'}>
                {users?.map((user: User, index) => (
                    <li key={index}>
                      <span>{user?.name ?? ''}</span>
                      <span>{user?.username ?? ''}</span>
                        {showMoreInfo?.[index] && <span>{user?.email ?? ''}</span>}
                        <button onClick={() => handleShowMoreInfo(index)}>
                            {!showMoreInfo?.[index]
                                ? 'Показать подробности'
                                : 'Скрыть'
                            }
                        </button>
                    </li>
                ))}
              </ul>
          ) : (
              <div>
                pusto
              </div>
          )
        }
      </>
  )
}

export default App