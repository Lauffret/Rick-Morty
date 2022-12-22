import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import styled from '../../utils/styled'
import Page from '../../components/layout/Page'
import Container from '../../components/layout/Container'
import DataTable from '../../components/layout/DataTable'
import LoadingOverlay from '../../components/data/LoadingOverlay'
import LoadingOverlayInner from '../../components/data/LoadingOverlayInner'
import LoadingSpinner from '../../components/data/LoadingSpinner'

import { ApplicationState } from '../../store'
import { Character } from '../../store/characters/types'
import { fetchRequest } from '../../store/characters/actions'

interface PropsFromState {
  loading: boolean
  data: Character[]
  errors?: string
}

interface PropsFromDispatch {
  fetchRequest: typeof fetchRequest
}

type AllProps = PropsFromState & PropsFromDispatch

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'https://rickandmortyapi.com/api/'

class CharactersIndexPage extends React.Component<AllProps> {
  public componentDidMount() {
    const { fetchRequest: fr } = this.props
    fr()
  }

  private renderData() {
    const { loading, data } = this.props

    return (
      <DataTable columns={['Personnage', 'Pro Picks/Bans*', 'Pro Wins*']} widths={['auto', '', '']}>
        {loading && data.length === 0 && (
          <CharacterLoading>
            <td colSpan={3}>Loading...</td>
          </CharacterLoading>
        )}
        {data.map(character => (
          <tr key={character.id}>
            <CharacterDetail>
              <CharacterIcon src={API_ENDPOINT + character.img} alt={character.name} />
              <CharacterName>
                <Link to={`/characters/${character.id}`}>{character.name}</Link>
              </CharacterName>
            </CharacterDetail>
            <td>
              {character.pro_pick || 0} / {character.pro_ban || 0}
            </td>
            <td>{character.pro_win || 0}</td>
          </tr>
        ))}
      </DataTable>
    )
  }

  public render() {
    const { loading } = this.props

    return (
      <Page>
        <Container>
          <TableWrapper>
            {loading && (
              <LoadingOverlay>
                <LoadingOverlayInner>
                  <LoadingSpinner />
                </LoadingOverlayInner>
              </LoadingOverlay>
            )}
            <p>
              <small>*in last 30 days</small>
            </p>
            {this.renderData()}
          </TableWrapper>
        </Container>
      </Page>
    )
  }
}

const mapStateToProps = ({ characters }: ApplicationState) => ({
  loading: characters.loading,
  errors: characters.errors,
  data: characters.data
})

const mapDispatchToProps = {
  fetchRequest
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CharactersIndexPage)

const TableWrapper = styled('div')`
  position: relative;
  max-width: ${props => props.theme.widths.md};
  margin: 0 auto;
  min-height: 200px;
`

const CharacterDetail = styled('td')`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const CharacterIcon = styled('img')`
  width: 32px;
  height: 32px;
`

const CharacterName = styled('div')`
  flex: 1 1 auto;
  height: 100%;
  margin-left: 1rem;

  a {
    color: ${props => props.theme.colors.brand};
  }
`

const CharacterLoading = styled('tr')`
  td {
    height: 48px;
    text-align: center;
  }
`
