const { simplifyClaims } = require('./simplify_claims')
const simplify = require('./simplify_text_attributes')
const simplifySitelinks = require('./simplify_sitelinks')

module.exports = (entity, options) => {
  const simplified = {
    id: entity.id,
    type: entity.type,
    modified: entity.modified
  }

  simplifyIfDefined(entity, simplified, 'labels')
  simplifyIfDefined(entity, simplified, 'descriptions')
  simplifyIfDefined(entity, simplified, 'aliases')

  if (entity.claims != null) {
    simplified.claims = simplifyClaims(entity.claims, options)
  }

  if (entity.sitelinks != null) {
    simplified.sitelinks = simplifySitelinks(entity.sitelinks, options)
  }

  return simplified
}

const simplifyIfDefined = (entity, simplified, attribute) => {
  if (entity[attribute] != null) {
    simplified[attribute] = simplify[attribute](entity[attribute])
  }
}
