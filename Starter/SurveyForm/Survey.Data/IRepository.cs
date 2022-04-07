using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Survey.Data
{
    public interface IRepository<T>
    {
        IQueryable<T> FindAll();
        IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression);
        void Create(T entity);
        void Update(T entity);
        void Delete(T entity);
        void Save();
        Task CreateAsync(T entity);
        Task UpdateAsync(T entity);
        Task DeleteAsync(T entity);
        Task SaveAsync();
    }


    public class Repository<T> : IRepository<T> where T : class
    {
        private MainContext _context { get; set; }

        public Repository(MainContext context)
        {
            this._context = context;
        }

        protected Repository(MainContext context, IMemoryCache cache)
        {
           this._context = context;
        }

        public IQueryable<T> FindAll()
        {
            return this._context.Set<T>().AsNoTracking();
        }

        public IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression)
        {
            return _context.Set<T>().Where(expression).AsNoTracking();
        }

        public void Create(T entity)
        {
            this._context.Set<T>().Add(entity);
        }

        public void Update(T entity)
        {
            this._context.Set<T>().Update(entity);
        }

        public void Delete(T entity)
        {
            this._context.Set<T>().Remove(entity);
        }

        public void Save()
        {
            this._context.SaveChanges();
        }

        public async Task CreateAsync(T entity)
        {
            this._context.Set<T>().Add(entity);
            await this._context.SaveChangesAsync();
        }

        public async Task UpdateAsync(T entity)
        {
            this._context.Set<T>().Update(entity);
            await this._context.SaveChangesAsync();
        }

        public async Task DeleteAsync(T entity)
        {
            this._context.Set<T>().Remove(entity);
            await this._context.SaveChangesAsync();
        }


        public async Task SaveAsync()
        {
            await this._context.SaveChangesAsync();
        }
    }
}
