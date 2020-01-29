import React from 'react';
import CollectionPreview from '../../components/collection-preview/collection-preview.component';
import CollectionOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import { Route } from 'react-router-dom';
const ShopPage = ({match}) => (
    <div className="shop-page">
        <Route exact path={`${match.path}`} component={CollectionOverview} />
        <Route exact path={`${match.path}/:collectionId`} component={CollectionPage} />
    </div>
)

export default ShopPage;