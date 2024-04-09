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
import {
  createQuestion,
  updateQuestion,
} from '@/app/services/actions-questions';
import { useFormState } from 'react-dom';
import { QuestionsTable } from '@/app/lib/models';

export default function Form({ question }: { question: QuestionsTable }) {
  const updateQuestionWithId = updateQuestion.bind(null, question.id);
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(updateQuestionWithId, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <input type="hidden" name="id" value={question.id} />

        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            标题
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="title"
                name="title"
                type="textarea"
                placeholder="请输入题目名称"
                defaultValue={question.title}
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
          <label htmlFor="type" className="mb-2 block text-sm font-medium">
            题目类型
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <select
                id="type"
                name="type"
                defaultValue={question.type}
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
                required
                aria-describedby="type-error"
              >
                <option value="" disabled>
                  选择题目类型
                </option>
                <option value="single_choice">单选题</option>
                <option value="multiple_choice">多选题</option>
                <option value="judgment">判断题</option>
                <option value="code">编码题</option>
              </select>
            </div>
            <div id="type-error" aria-live="polite" aria-atomic="true">
              {state.errors?.type &&
                state.errors.type.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="options" className="mb-2 block text-sm font-medium">
            选项
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="options"
                name="options"
                type="textarea"
                placeholder="请输入选项"
                defaultValue={question.options?.join(',')}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
                required
                aria-describedby="options-error"
              />
            </div>
            <div id="options-error" aria-live="polite" aria-atomic="true">
              {state.errors?.options &&
                state.errors.options.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="answer" className="mb-2 block text-sm font-medium">
            答案
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="answer"
                name="answer"
                type="textarea"
                placeholder="请输入答案"
                defaultValue={question.answer ?? ''}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
                required
                aria-describedby="answer-error"
              />
            </div>
            <div id="answer-error" aria-live="polite" aria-atomic="true">
              {state.errors?.answer &&
                state.errors.answer.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="analysis" className="mb-2 block text-sm font-medium">
            分析
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="analysis"
                name="analysis"
                type="textarea"
                placeholder="请输入分析"
                defaultValue={question.analysis}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
                required
                aria-describedby="analysis-error"
              />
            </div>
            <div id="analysis-error" aria-live="polite" aria-atomic="true">
              {state.errors?.analysis &&
                state.errors.analysis.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="difficulty"
            className="mb-2 block text-sm font-medium"
          >
            难度
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <select
                id="difficulty"
                name="difficulty"
                defaultValue={question.difficulty}
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
                required
                aria-describedby="difficulty-error"
              >
                <option value="" disabled>
                  选择难度
                </option>
                <option value="1">简单</option>
                <option value="2">一般</option>
                <option value="3">中等</option>
                <option value="4">偏难</option>
                <option value="5">困难</option>
              </select>
            </div>
            <div id="difficulty-error" aria-live="polite" aria-atomic="true">
              {state.errors?.difficulty &&
                state.errors.difficulty.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="score" className="mb-2 block text-sm font-medium">
            分数
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="score"
                name="score"
                type="number"
                placeholder="请输入分数"
                defaultValue={question.score}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
                required
                aria-describedby="score-error"
              />
            </div>
            <div id="score-error" aria-live="polite" aria-atomic="true">
              {state.errors?.score &&
                state.errors.score.map((error: string) => (
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
                defaultValue={question.tags?.join(',')}
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
          href="/dashboard/questions"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          取消
        </Link>
        <Button type="submit">更新题目</Button>
      </div>
    </form>
  );
}
