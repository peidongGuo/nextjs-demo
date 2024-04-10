'use client';

import { CustomerField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createPaper } from '@/app/services/actions-papers';
import { useFormState } from 'react-dom';
import { PapersTable } from '@/app/lib/models';

export default function Form({ paper }: { paper?: PapersTable }) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createPaper, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            名称
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="title"
                name="title"
                type="textarea"
                placeholder="请输入名称"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
                required
                aria-describedby="title-error"
              />
            </div>
            <div id="title-error" aria-live="polite" aria-atomic="true">
              {state.errors?.title &&
                state.errors.title.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="total_score"
            className="mb-2 block text-sm font-medium"
          >
            总分
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="total_score"
                name="total_score"
                type="textarea"
                placeholder="请输入总分"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
                required
                aria-describedby="total_score-error"
              />
            </div>
            <div id="total_score-error" aria-live="polite" aria-atomic="true">
              {state.errors?.total_score &&
                state.errors.total_score.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="duration" className="mb-2 block text-sm font-medium">
            时长
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="duration"
                name="duration"
                type="textarea"
                placeholder="请输入时长"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
                required
                aria-describedby="duration-error"
              />
            </div>
            <div id="duration-error" aria-live="polite" aria-atomic="true">
              {state.errors?.duration &&
                state.errors.duration.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="questions" className="mb-2 block text-sm font-medium">
            题目
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="questions"
                name="questions"
                type="textarea"
                placeholder="请输入题目"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
                required
                aria-describedby="questions-error"
              />
            </div>
            <div id="questions-error" aria-live="polite" aria-atomic="true">
              {state.errors?.questions &&
                state.errors.questions.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="level" className="mb-2 block text-sm font-medium">
            难度
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="level"
                name="level"
                type="textarea"
                placeholder="请输入难度"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
                required
                aria-describedby="level-error"
              />
            </div>
            <div id="level-error" aria-live="polite" aria-atomic="true">
              {state.errors?.level &&
                state.errors.level.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="tags" className="mb-2 block text-sm font-medium">
            标签
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="tags"
                name="tags"
                type="textarea"
                placeholder="请输入标签"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
                required
                aria-describedby="tags-error"
              />
            </div>
            <div id="tags-error" aria-live="polite" aria-atomic="true">
              {state.errors?.tags &&
                state.errors.tags.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/papers"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          取消
        </Link>
        <Button type="submit">创建试卷</Button>
      </div>
    </form>
  );
}
