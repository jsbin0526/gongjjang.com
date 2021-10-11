// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchArticle, viewArticle, writeArticle } from '../_actions/article_action'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

function CommunityPage (props: any) {
  const [Component, SetComponent] = useState(<FetchArticlePage userInfo = {props.userInfo} />)

  function FetchArticlePage (props: any) {
    const dispatch = useDispatch()

    const [Query, SetQuery] = useState('')
    const [ArticleList, SetArticleList] = useState([{ id: 0, title: '글 로딩중입니다', body: '로딩이 계속되는경우 인터넷 상태를 확인하시고 문의주세요', author: '', name: '', date: '', likes: 0, views: 0 }])

    const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault()
      SetQuery(event.currentTarget.value)
    }

    const handleChangeWriteComponent = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      SetComponent(<WriteArticlePage userInfo = { props.userInfo } />)
    }

    const handleChangeViewComponent = (articleInfo: { id: number, title: string, body: string, author: string, name: string, date: string, likes: number, views: number }) => {
      return (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault()
        SetComponent(<ViewArticlePage articleInfo = {articleInfo} />)
      }
    }

    const handleFetch = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      const body = {
        query: Query
      }
      dispatch(fetchArticle(body)).then(async (response) => {
        SetArticleList((await response.payload).fetchResults)
      })
    }

    useEffect(() => {
      const body = {
        query: Query
      }
      dispatch(fetchArticle(body)).then(async (response) => {
        SetArticleList((await response.payload).fetchResults)
      })
    }, [])

    return (
      <div>
        <form>
          <input type="text" id="queryChange" placeholder="검색어를 입력해주세요" onChange={handleChangeQuery}/>
          <button onClick={handleFetch}>검색</button>
          <button onClick={handleChangeWriteComponent}>글 쓰기</button>
          <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>글쓴이</th>
              <th>조회수</th>
              <th>좋아요수</th>
            </tr>
          </thead>
          {ArticleList.map(function (e) {
            return <tbody key = {e.id}>
              <tr>
                <td><a href='#' onClick = {handleChangeViewComponent(e)} style={{ display: 'block', height: '100%' }} >{e.id}</a></td>
                <td><a href='#' onClick = {handleChangeViewComponent(e)} style={{ display: 'block', height: '100%' }} >{e.title}</a></td>
                <td><a href='#' onClick = {handleChangeViewComponent(e)} style={{ display: 'block', height: '100%' }} >{e.name}</a></td>
                <td><a href='#' onClick = {handleChangeViewComponent(e)} style={{ display: 'block', height: '100%' }} >{e.views}</a></td>
                <td><a href='#' onClick = {handleChangeViewComponent(e)} style={{ display: 'block', height: '100%' }} >{e.likes}</a></td>
              </tr>
            </tbody>
          })}
          </table>
        </form>
      </div>
    )
  }

  function WriteArticlePage (props: any) {
    const dispatch = useDispatch()

    const [Title, SetTitle] = useState('')
    const [Body, SetBody] = useState('')

    const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault()
      SetTitle(event.currentTarget.value)
    }

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
      const today = new Date()
      event.preventDefault()
      const body = {
        title: Title,
        body: Body,
        date: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
      }
      dispatch(writeArticle(body)).then(async (response) => {
        if ((await response.payload).writeSuccess) {
          alert('글 작성에 성공했습니다')
          SetComponent(<FetchArticlePage userInfo={props.userInfo} />)
        } else {
          alert('글 작성에 실패했습니다')
          console.log(await response.payload)
        }
      })
    }

    return (
      <div>
        <CKEditor
        editor = { ClassicEditor }
        data='<p>Hello from CKEditor 5!</p>'
        onReady={(editor) => {
          console.log('Editor is ready to use!', editor)
        }}
        onChange={(event, editor) => {
          const data = editor.getData()
          SetBody(data)
          console.log({ event, editor, data })
        }}
        onBlur={(event, editor) => {
          console.log('Blur.', editor)
        }}
        onFocus={(event, editor) => {
          console.log('Focus.', editor)
        }}
        />
        <form>
          <input type="text" id="title" placeholder="제목을 입력해주세요" onChange={handleChangeTitle}/>
          <br/>
          <br/>
          <button onClick={handleSubmit}>글 쓰기</button>
        </form>
      </div>
    )
  }

  function ViewArticlePage (props: any) {
    const dispatch = useDispatch()
    const [Article, SetArticle] = useState({ id: 0, title: '글 로딩중입니다', body: '로딩이 계속되는 경우 인터넷 상태를 확인하시고 문의주세요', name: '', date: '', views: 0, likes: 0 })

    useEffect(() => {
      const id = props.articleInfo.id
      dispatch(viewArticle({ id: id })).then(async (response) => {
        SetArticle((await response.payload).viewResults)
      })
    })

    return (
      <div>
        <header>
         <div>{Article.title}</div>
         <div>{Article.name}</div>
         <div>{Article.date}</div>
         <div>{Article.views}</div>
         <div>{Article.likes}</div>
        </header>
      </div>
    )
  }

  return (
    Component
  )
}

export default CommunityPage
