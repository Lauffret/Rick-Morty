import * as React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'

import {
  CharacterInfobox,
  CharacterInfoboxImage,
  CharacterInfoboxHeading,
  CharacterInfoboxInner,
  CharacterInfoboxBlurBackground,
  CharacterName,
  CharacterRoles
} from '../../components/characters/CharacterInfobox'
import { CharacterStats, CharacterStatsInner, StatAttribute, Bullet } from '../../components/characters/CharacterStats'
import { CharacterDetails, CharacterDetailsColumn, CharacterDetailsRow, CharacterDetailsAttrName } from '../../components/characters/CharacterDetails'
import Page from '../../components/layout/Page'
import Container from '../../components/layout/Container'

import { ApplicationState } from '../../store'
import { Character } from '../../store/characters/types'
import { fetchRequest } from '../../store/characters/actions'
import styled from '../../utils/styled'
import LoadingOverlay from '../../components/data/LoadingOverlay'
import LoadingOverlayInner from '../../components/data/LoadingOverlayInner'
import LoadingSpinner from '../../components/data/LoadingSpinner'

interface PropsFromState {
  loading: boolean
  data: Character[]
  errors?: string
}

interface PropsFromDispatch {
  fetchCharacters: typeof fetchRequest
}

interface RouteParams {
  name: string
}

interface State {
  selected?: Character
}

type AllProps = PropsFromState & PropsFromDispatch & RouteComponentProps<RouteParams>

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'https://api.opendota.com'

const Wrapper = styled('div')`
  position: relative;
`

class ShowCharactersPage extends React.Component<AllProps, State> {
  constructor(props: AllProps) {
    super(props)

    this.state = {}
  }

  public componentDidMount() {
    const { data, fetchCharacters } = this.props

    if (!data || data.length === 0) {
      fetchCharacters()
    }
  }

  public render() {
    const { data, loading, match } = this.props
    const selected = data.find(character => character.name === match.params.name)

    return (
      <Page>
        <Container>
          <Wrapper>
            {loading && (
              <LoadingOverlay>
                <LoadingOverlayInner>
                  <LoadingSpinner />
                </LoadingOverlayInner>
              </LoadingOverlay>
            )}
            {selected && (
              <>
                <CharacterInfobox>
                  <CharacterInfoboxBlurBackground src={API_ENDPOINT + selected.img} />
                  <CharacterInfoboxInner>
                    <CharacterInfoboxImage src={API_ENDPOINT + selected.img} />
                    <CharacterInfoboxHeading>
                      <CharacterName>{selected.localized_name}</CharacterName>
                      <CharacterRoles>
                        {selected.attack_type} - <span>{selected.roles.join(', ')}</span>
                      </CharacterRoles>
                    </CharacterInfoboxHeading>
                    <CharacterStats>
                      <CharacterStatsInner>
                        <StatAttribute attr="str" isPrimaryAttr={selected.primary_attr === 'str'}>
                          <Bullet attr="str" /> {selected.base_str || 0} + {selected.str_gain || 0}
                        </StatAttribute>
                        <StatAttribute attr="agi" isPrimaryAttr={selected.primary_attr === 'agi'}>
                          <Bullet attr="agi" /> {selected.base_agi || 0} + {selected.agi_gain || 0}
                        </StatAttribute>
                        <StatAttribute attr="int" isPrimaryAttr={selected.primary_attr === 'int'}>
                          <Bullet attr="int" /> {selected.base_int || 0} + {selected.int_gain || 0}
                        </StatAttribute>
                      </CharacterStatsInner>
                    </CharacterStats>
                  </CharacterInfoboxInner>
                </CharacterInfobox>
                <CharacterDetails>
                  <CharacterDetailsColumn>
                    <CharacterDetailsRow>
                      <CharacterDetailsAttrName>Base Attack:</CharacterDetailsAttrName> {selected.base_attack_min} - {selected.base_attack_max}
                    </CharacterDetailsRow>
                    <CharacterDetailsRow>
                      <CharacterDetailsAttrName>Attack Range:</CharacterDetailsAttrName> {selected.attack_range || '-'}
                    </CharacterDetailsRow>
                    <CharacterDetailsRow>
                      <CharacterDetailsAttrName>Attack Speed:</CharacterDetailsAttrName> {selected.attack_speed || '-'}
                    </CharacterDetailsRow>
                    <CharacterDetailsRow>
                      <CharacterDetailsAttrName>Projectile Speed:</CharacterDetailsAttrName> {selected.projectile_speed || '-'}
                    </CharacterDetailsRow>
                  </CharacterDetailsColumn>
                  <CharacterDetailsColumn>
                    <CharacterDetailsRow>
                      <CharacterDetailsAttrName>Health:</CharacterDetailsAttrName> {selected.base_health || 0}
                    </CharacterDetailsRow>
                    <CharacterDetailsRow>
                      <CharacterDetailsAttrName>Health Regen:</CharacterDetailsAttrName> {selected.base_health_regen || 0}
                    </CharacterDetailsRow>
                    <CharacterDetailsRow>
                      <CharacterDetailsAttrName>Mana:</CharacterDetailsAttrName> {selected.base_mana || 0}
                    </CharacterDetailsRow>
                    <CharacterDetailsRow>
                      <CharacterDetailsAttrName>Mana Regen:</CharacterDetailsAttrName> {selected.base_mana_regen || 0}
                    </CharacterDetailsRow>
                  </CharacterDetailsColumn>
                  <CharacterDetailsColumn>
                    <CharacterDetailsRow>
                      <CharacterDetailsAttrName>Base Armor:</CharacterDetailsAttrName> -
                    </CharacterDetailsRow>
                    <CharacterDetailsRow>
                      <CharacterDetailsAttrName>Magic Resistance:</CharacterDetailsAttrName> {selected.base_mr || 0}%
                    </CharacterDetailsRow>
                    <CharacterDetailsRow>
                      <CharacterDetailsAttrName>Move Speed:</CharacterDetailsAttrName> {selected.move_speed || 0}
                    </CharacterDetailsRow>
                    <CharacterDetailsRow>
                      <CharacterDetailsAttrName>Turn Speed:</CharacterDetailsAttrName> {selected.turn_rate || 0}
                    </CharacterDetailsRow>
                  </CharacterDetailsColumn>
                  <CharacterDetailsColumn>
                    <CharacterDetailsRow>
                      <CharacterDetailsAttrName>Number of Legs:</CharacterDetailsAttrName> {selected.legs}
                    </CharacterDetailsRow>
                    <CharacterDetailsRow>
                      <CharacterDetailsAttrName>CM Enabled:</CharacterDetailsAttrName> {selected.cm_enabled ? 'yes' : 'no'}
                    </CharacterDetailsRow>
                  </CharacterDetailsColumn>
                </CharacterDetails>
              </>
            )}
          </Wrapper>
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
  fetchCharacters: fetchRequest
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowCharactersPage)
