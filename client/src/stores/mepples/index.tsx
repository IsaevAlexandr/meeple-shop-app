import { observable, action, computed } from 'mobx';
import { Mepple, STATUS, ColorTypes } from '../../types';
import { baseURL } from '../../lib/httpService';
import { MeepleApi, meepleApi } from '../../lib/meppleApi';

type SortType = 'order' | 'color';

class MepplesStore {
    api: MeepleApi;

    constructor(api: MeepleApi) {
        this.api = api;
    }

    @observable meeplesCollection: Record<string, Mepple> = {};
    @observable isFetched: boolean = false;
    @observable colorTypeFilter: ColorTypes = '';
    @observable sortType: SortType = 'order';
    @observable status = STATUS.done;

    // compute indexes of avalible to show items
    @computed get meeples(): number[] {
        if (this.sortType === 'color' && this.colorTypeFilter !== '') {
            return Object.values(this.meeplesCollection)
                .filter(x => x.colorType === this.colorTypeFilter)
                .map(({ id }) => id);
        }

        return Object.values(this.meeplesCollection)
            .sort((a, b) => a.order - b.order)
            .map(({ id }) => id);
    }

    @computed get isPending() {
        return Boolean(this.status === STATUS.pending);
    }

    @action filterBy = ({
        sortType,
        colorTypeFilter,
    }: {
        sortType: SortType;
        colorTypeFilter?: ColorTypes;
    }) => {
        this.sortType = sortType;

        if (colorTypeFilter != null) {
            this.colorTypeFilter = colorTypeFilter;
        }
    };

    @action fetchData = async () => {
        if (this.isFetched) return;

        try {
            this.status = STATUS.pending;

            const rawServerData = await this.api.fetchMeppleList();

            this.meeplesCollection = this._normalizeMeeples(rawServerData);

            this.isFetched = true;
            this.status = STATUS.done;
        } catch (e) {
            this.status = STATUS.failed;
        }
    };

    _normalizeMeeples = (meeples: Mepple[]) =>
        meeples.reduce((acc, item) => {
            if (!item.disabled) {
                acc[item.id] = item;
                acc[item.id].imageSrc.url = baseURL + acc[item.id].imageSrc.url;
            }

            return acc;
        }, {} as Record<string, Mepple>);
}

export const mepplesStore = new MepplesStore(meepleApi);
