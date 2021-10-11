// eslint-disable-next-line no-use-before-define
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { authUser } from '../_actions/user_action'
import { useStateWithCallbackLazy } from 'use-state-with-callback'

export default function Auth (SpecificComponent, option) {
  function AuthenticationCheck (props: any) {
    const dispatch = useDispatch()
    const [Payload, SetPayload] = useStateWithCallbackLazy({ isAuth: false })

    useEffect(() => {
      dispatch(authUser()).then(async (response) => {
        SetPayload(await response.payload, () => {
          if (!Payload.isAuth) {
            if (option) {
              props.history.push('/login')
            }
          } else {
            if (option === false) {
              props.history.push('/')
            }
          }
        })
      })
      return () => {
      }
    }, [])
    return <SpecificComponent payload={Payload}/>
  }
  return AuthenticationCheck
}
