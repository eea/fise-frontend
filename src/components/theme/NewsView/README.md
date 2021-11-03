# Deployment steps

* Create a news portlet in ``/api``
* In ``portal_types``, add the ``news_item_listing_view`` as an available view method for the content type that's going to be used as the news listing. In forest that content type is ``Document`` (composite page)
* In ``portal_types``, set ``document_view`` as the only Default view method andAvailable view methods for the "News item" content type
* Add ``volto.blocks`` as a behaviour for "News item" through ``portal_types`` in zope or ``Dexterity Content Types -> Behaviours`` in plone administration
